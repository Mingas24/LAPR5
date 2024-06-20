%Constants
hard_constraint(10).
hard_constraint_2(8).
soft_constraint(1).
lunchtime_begin(11).
lunchtime_end(15).
dinnertime_begin(18).
dinnertime_end(22).
min_break(1).
time_inf_forbid(8).
time_sup_forbid(12).
time_inf_avoid(10).
time_sup_avoid(12).

%Constraints for all drivers
driver_constraints(DriverDuty, Pen):-
    time_inf_forbid(InfForbid),
    time_sup_forbid(SupForbid),
    time_inf_avoid(InfAvoid),
    time_sup_avoid(SupAvoid),
    hours_to_minutes_seconds(InfForbid,_,Sec1Forbid),
    hours_to_minutes_seconds(SupForbid,_,Sec2Forbid),
    hours_to_minutes_seconds(InfAvoid,_,Sec1Avoid),
    hours_to_minutes_seconds(SupAvoid,_,Sec2Avoid),
    (max_hours(DriverDuty, Pen1),!;Pen1 is 0),
    total_hours(DriverDuty, Pen2),
    break_time(DriverDuty, Pen3),
    lunch_time(DriverDuty, Pen4),
    dinner_time(DriverDuty, Pen5),
    forbidden_time(Sec1Forbid, Sec2Forbid, DriverDuty, Pen6),
    avoid_time(Sec1Avoid, Sec2Avoid, DriverDuty, Pen7),
    Pen1_2 is Pen1 + Pen2,
    Pen2_3 is Pen1_2 + Pen3,
    Pen3_4 is Pen2_3 + Pen4,
    Pen4_5 is Pen3_4 + Pen5,
    Pen5_6 is Pen4_5 + Pen6,
    Pen is Pen5_6 + Pen7.


%Penalty if 4 hours straight
max_hours([], 0).
max_hours([DD|DriverDuty],Pen_4_hours):-
    max_hours(DriverDuty,Pen_4_hours1),
    max_hours_DD(DD, Pen),
    Pen_4_hours is Pen_4_hours1 + Pen,!.

max_hours_DD(DD, Pen):-
    hard_constraint(Hard),
    DD = (Start,End,_),
    Diff is End - Start,
    hours_to_minutes_seconds(4,_,Seconds),
    Constraint is Diff - Seconds,
    (Constraint>=0,Pen is Constraint*Hard,!;fail).

%Penalty if plus 8 hours a day
total_hours(DriverDuty, Pen):-
    sum_DD(DriverDuty, SumTimes),
    hours_to_minutes_seconds(8,_,Seconds),
    Diff is SumTimes - Seconds,
    (Diff>0, Pen is Diff;Pen is 0),!.

sum_DD([],0).
sum_DD([DD|DriverDuty], Sum):-
    sum_DD(DriverDuty, Sum1),
    DD = (Start,End,_),
    Diff is End - Start,
    Sum is Sum1 + Diff,!.

%Break time between 4 hours of work must be 1 hour, penalty if the rule is broken
break_time([_],0):-!.
break_time([DD1,DD2|DriverDuty],Pen):-
    break_time([DD2|DriverDuty],Pen2),
    max_hours_DD(DD1,_),
    hard_constraint_2(Hard),
    DD1 = (_,End1,_),
    DD2 = (Start1,_,_),
    Diff is Start1 - End1,
    hours_to_minutes_seconds(1,_,Seconds),
    Constraint is Seconds - Diff,
    (Constraint =<0,Pen1 is 0,!;Pen1 is Constraint*Hard),
    Pen is Pen1 + Pen2,!.
break_time([_|DriverDuty],Pen):-
    break_time(DriverDuty,Pen),!.


%Penalty if does not have lunch between 11 and 15
lunch_time(DriverDuty, Pen):-
    lunchtime_begin(Lunch1),
    lunchtime_end(Lunch2),
    meal_time(DriverDuty,Lunch1,Lunch2,Pen).

%Penalty if does not have dinner between 18 and 22
dinner_time(DriverDuty, Pen):-
    dinnertime_begin(Dinner1),
    dinnertime_end(Dinner2),
    meal_time(DriverDuty,Dinner1,Dinner2,Pen).

meal_time(DriverDuty,Meal1,Meal2,Pen):-
    DDBegin = (0,0,_),
    DDEnd = (86400,86400,_),
    append([DDBegin],DriverDuty,DriverDuty1),
    append(DriverDuty1,[DDEnd],DriverDuty2),
    meal_time1(DriverDuty2, Meal1,Meal2,0,Pen),!.

meal_time1([_],_,_,Max,Pen):-
    min_break(Hour),
    hours_to_minutes_seconds(Hour,_,Seconds),
    hard_constraint_2(Hard),
    Diff is Seconds - Max,
    (Diff>0,Pen is Diff*Hard,!;Diff=<0,Pen is 0),!.
meal_time1([DD1,DD2|DriverDuty],Meal1,Meal2,Max1,Pen):-
    (meal_break(DD1,DD2,Meal1,Meal2,Break),update_break(Break,Max1,Max);Max is Max1),
    meal_time1([DD2|DriverDuty],Meal1,Meal2,Max,Pen).

%Sees if there is a meal break between 2 driver dutys
% 0 if it intercepts in the limit 1
% 1 if it is contained inside the interval of the two DD
% 2 if it intercepts in the limit 2
% 3 if it contains the interval
% false if it does not intercept the meal break
meal_break(DD1,DD2,Meal1,Meal2,Break):-
    DD1 = (_,Start,_),
    DD2 = (End,_,_),
    hours_to_minutes_seconds(Meal1,_,InicialLimit),
    hours_to_minutes_seconds(Meal2,_,FinalLimit),
    (Start =< FinalLimit, End >=InicialLimit),
    %0
    (Start=<InicialLimit,End=<FinalLimit, Break is End - InicialLimit,!
    ;%1
    Start>=InicialLimit,End=<FinalLimit, Break is End - Start,!
    ;%2
    Start>=InicialLimit,End>=FinalLimit, Break is FinalLimit - Start,!
    ;%3
    Start=<InicialLimit,End>=FinalLimit, Break is FinalLimit - InicialLimit,!
    ),!.

% Updates to a bigger break 
update_break(Break,Max1,Max2):-
    (Break>=Max1,Max2 is Break,!
    ;
    Max1>Break,Max2 is Max1,!),!.

% Penalty if he works at hours strictly forbidden
forbidden_time(_,_,[],0).
forbidden_time(Hour1,Hour2,[Driver|DriverDuty],Pen):-
    forbidden_time(Hour1,Hour2,DriverDuty,Pen2),
    Driver = (Start,End,_),
    hard_constraint_2(Hard),
    prefered_time(Start,End,Hour1,Hour2,Hard,Pen1),
    Pen is Pen1 + Pen2,!.

%Penalty if he works at hours that he does not want to or that are inconvenient
avoid_time(_,_,[],0).
avoid_time(Hour1,Hour2,[Driver|DriverDuty],Pen):-
    avoid_time(Hour1,Hour2,DriverDuty,Pen2),
    Driver = (Start,End,_),
    soft_constraint(Soft),
    prefered_time(Start,End,Hour1,Hour2,Soft,Pen1),
    Pen is Pen1 + Pen2,!.

%Penalty for hours inside the hour 1 and hour2 interval
prefered_time(Start,End,Hour1,Hour2,Const,Pen):-
    (
        Start < Hour1,
        (End =< Hour1,Pen1 is 0,!;End>Hour1,End=<Hour2,Pen1 is End-Hour1,!; End>Hour2,Pen1 is Hour2-Hour1,!),!
        ;
        Start>=Hour1,Start<Hour2,
        (End=<Hour2,Pen1 is End-Start,!; End>Hour2,Pen1 is End - Hour2,!),!
        ;
        Start>=Hour2,
        (End>=Hour2,Pen1 is 0)
    ),
    Pen is Pen1 * Const,!.

%Penalty for hours outside the hour1 and hour2 interval
prefered_time_outside(Start,End,Hour1,Hour2,Const,Pen):-
    (
        Start < Hour1,
        (End =< Hour1,Pen1 is End - Start,!;End>Hour1,End=<Hour2,Pen1 is Hour1-Start,!; End>Hour2,Diff is End -Start, Int is Hour2-Hour1, Pen1 is Diff - Int),!
        ;
        Start>=Hour1,Start<Hour2,
        (End=<Hour2,Pen1 is 0,!; End>Hour2,Pen1 is End - Hour2),!
        ;
        Start>=Hour2,
        (End>=Hour2,Pen1 is End - Start)
    ),
    Pen is Pen1 * Const,!.