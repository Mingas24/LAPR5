:-consult(constraints).

% Creates an individual to the vehicleID, generates population
initial_generate(VehicleID, SPop, Pop):-
    list_drivers_nworkblocks(VehicleID, LWork),
    generate_individual(LWork, Individual),
    shuffle_population(Individual, SPop, Pop).

% Generates an indivual
generate_individual([],[]):-!.
generate_individual([(DriverID,NWork)|Tail],List):-
    generate_individual(Tail, Rest),
    generate_list(DriverID, NWork, SubList),
    append(SubList, Rest, List).

%Generates a List with Element repeated N times
generate_list(Element, 1, [Element]):-!.
generate_list(Element, N, [Element|List]):-
    N1 is N-1,
    generate_list(Element, N1, List).

shuffle_population(_,0,[]):-!.
shuffle_population(Individual, SPop,[Ind1|Pop]):- 
    SPop1 is SPop -1 ,
    random_permutation(Individual, Ind1),
    shuffle_population(Individual, SPop1, Pop).

%-------------------------------------------------------Evaluations-------------------------------------------------------------
%Evaluates all individuals one at a time
evaluate_pop([],[]).
evaluate_pop([Ind|Pop],[Ind*Pen|PopPen]):-
    evaluate_individual(Ind, Pen),
    evaluate_pop(Pop, PopPen),!.

%Evaluates an individual
evaluate_individual(Ind, Pen):-
    temporal_schedule(Ind, Schedule),
    join_schedule(Schedule, ScheduleOrganized),
    group_drivers(ScheduleOrganized, Grouped),
    restrictions(Grouped, Pen).

%Builds a schedule that has the individuals and the workblocks they will do
temporal_schedule(Ind, Schedule):-
    vehicleID(VehicleID),
    vehicleduty(VehicleID, ListWork),
    buildTemporal(Ind, ListWork, Schedule).

buildTemporal([],[],[]):-!.
buildTemporal([DriverID|Ind],[Head|ListWork],[(StartTime,EndTime,DriverID)|Schedule]):-
    workblock(Head,_,StartTime,EndTime),
    buildTemporal(Ind,ListWork,Schedule).

%For example if you have 2 or more workblocks with the same driver it puts them together
join_schedule([Ind],[Ind]):-!.
join_schedule([Ind1,Ind2|Schedule], Organized):-
    Ind1 = (Start1,_,Mot),
    Ind2 = (_,End1,Mot),
    join_schedule([(Start1,End1,Mot)|Schedule], Organized),!.
join_schedule([Ind1,Ind2|Schedule],[Ind1|Organized]):-
    join_schedule([Ind2|Schedule],Organized),!.

%Joins all drivers in a matrix like variable with the drivers organized by driverID
group_drivers(ScheduleOrganized, Grouped):-
    sort_Drivers(ScheduleOrganized, ScheduleSorted),
    join_Drivers(ScheduleSorted, Grouped).

sort_Drivers(List,SortedList):-
    swap(List,List1),!,
    sort_Drivers(List1,SortedList).
sort_Drivers(List,List).

swap([X,Y|Tail], [Y,X|Tail]):-
    X = (_,_,X1),
    Y = (_,_,Y1),
    X1>Y1,!.
swap([Z|Tail],[Z|Tail1]):-swap(Tail,Tail1).

%Joins the drivers from DriverDuty
join_Drivers([Ind],[Ind]).
join_Drivers([Ind1,Ind2|ScheduleSorted], Grouped):-
    Ind2 = (_,_,Mot),
    (is_list(Ind1),
        Ind1 = [(_,_,Mot)|_],
        append(Ind1,[Ind2],Ind3),!
        ;
        Ind1 = (_,_,Mot),
        Ind3 = [Ind1, Ind2]
    ),
    join_Drivers([Ind3|ScheduleSorted],Grouped),!.
join_Drivers([Ind1,Ind2|ScheduleSorted], [Ind|Grouped]):-
    (not(is_list(Ind1)),
        Ind = [Ind1],!
        ;
        is_list(Ind1),
        Ind = Ind1
    ),
    join_Drivers([[Ind2]|ScheduleSorted], Grouped),!.
    
%Applies penalties to individuals
restrictions([],0).
restrictions([DriverDuty|Tail], Pen):-
    restrictions(Tail,Pen2),!,
    driver_constraints(DriverDuty,Pen1),
    Pen is Pen1 + Pen2,!.

%------------------------------------------------Order-----------------------------------
order_Pop(PopAv,PopAvOrd):-bsort(PopAv,PopAvOrd).

bsort([Ind],[Ind]):-!.
bsort([Ind|Pop],Ord):-
	bsort(Pop,Rest),
	btroca([Ind|Rest],Ord).

btroca([X],[X]):-!.
btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).
btroca([X|L1],[X|L2]):-btroca(L1,L2).
