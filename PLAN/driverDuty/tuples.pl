:-consult(kb).
:-consult(begin).
:-consult(generate).
:-dynamic tuple/4.

start():-   retractall(tuple(_,_,_,_)),
            retractall(list_drivers_nworkblocks(_,_)),
            retractall(driverDuty(_,_)),
            retractall(times(_,_,_)),
            findall((ID,Start,End,Duration,Blocks), 
            driverTimes(ID,Start,End,Duration,Blocks), List),
            t(List), orderTuples(S), orderVD(S1), assignTuples(S, S1)
            .

t([]).
t([(ID,Start,End,Duration,Blocks)|Rest]):-length(Blocks, S),
                                    ((S>1,!, tuples1(ID,Start,End,Blocks)); assertz(tuple(Start,End,Duration,ID))),
                                    t(Rest).

tuples1(ID,Start,End,[H1|Tail]):- Time is Start + H1, assertz(tuple(Start, Time, H1, ID)),
                                    member(X, Tail),
                                    T is End - X, assertz(tuple(T, End, X, ID)).

orderTuples(Sorted):- findall((Begin,End,Dur,ID),tuple(Begin,End,Dur,ID),List),
                    sort(1, @=<, List, Sorted).

orderVD(Sorted):- findall((VID, Start), vehicleduty(VID, Start), List),
                    findStartTime(List, StartTimes),
                    sort(2,@=<,StartTimes,Sorted).

findStartTime([],[]).
findStartTime([(ID,[H|_])|Tail1], [(ID,StartTime)|StartTimes]):- workblock(H,_,StartTime,_), findStartTime(Tail1, StartTimes).

assignTuples(_,[]).
assignTuples([],_).
assignTuples(Tuples, VDuty):-VDuty = [(VID,_)|T2],
                                    Tuples = [(Start,End,Dur,ID)|T],
                                    vehicleduty(VID, Workblocks),
                                    (list_drivers_nworkblocks(VID,MWB),!;MWB=[]),
                                    length(Workblocks, Size1), test(MWB, Size2),
                                    (
                                        Size1 > Size2, 
                                        checkBiggest(Workblocks, WbBig),
                                        MaxBlock is (Dur // WbBig), 
                                        (
                                            MaxBlock > 0,
                                            ((Size2 + MaxBlock + 1) > Size1, NewBlock is (Size1 - Size2),
                                            (
                                                retract(list_drivers_nworkblocks(VID,MWB)),
                                                asserta(list_drivers_nworkblocks(VID,[(ID, NewBlock)|MWB])),
                                                !
                                            ;
                                                asserta(list_drivers_nworkblocks(VID,[(ID, NewBlock)]))
                                            ),
                                            retract(tuple(Start,End,Dur,ID)), assignTuples(T, T2),!
                                            ;
                                            NewBlock is MaxBlock + 1,
                                            (
                                                retract(list_drivers_nworkblocks(VID,MWB)),
                                                asserta(list_drivers_nworkblocks(VID,[(ID, NewBlock)|MWB])),
                                                !
                                            ;
                                                asserta(list_drivers_nworkblocks(VID,[(ID, NewBlock)]))
                                            ),
                                            retract(tuple(Start,End,Dur,ID)), assignTuples(T, VDuty)),
                                            !
                                        ;
                                            assignTuples(Tuples,T2)
                                        ),
                                        !
                                    ;
                                        assignTuples(Tuples,T2)
                                    ),
                                    !
                                    .

checkBiggest([],0).
checkBiggest([H|T], S):- checkBiggest(T, S1), workblock(H,_,TB,TE),
                        Size is (TE-TB),(Size> S1, S is Size;S is S1).

test([],0).
test([(_,N)|T],S):-
    test(T,S1),
    S is S1 + N
.

createDD(G,P,PC,PM,List):-start(),
                        findall((VID,WB), (vehicleduty(VID, WB), generate_server(G,P,VID,PC,PM,Ind),Ind = A*_,pre(A,WB)), List),
                        % percorrer os driver dutys, criar agendas para cada driverDuty,  avaliar cada driverduty, 
                        run(),
                        findall((A,B,C),times(A,B,C),Sche),
                        join_schedule(Sche, ScheduleOrganized),!,
                        group_drivers(ScheduleOrganized, Grouped),!,
                        restrictions(Grouped, Pen)
                        .

pre([],[]).
pre([H|T],[H1|T1]):-  (retract(driverDuty(H,W)),!;W = []),
                        asserta(driverDuty(H,[H1|W])),
                        pre(T,T1).

run():- findall((H,W),driverDuty(H,W),List), createSche(List).

createSche([]).
createSche([(_,[])|T]):-createSche(T).
createSche([(ID,[H|T1])|T]):-workblock(H,_,Start,End),
                            asserta(times(Start,End,ID)),
                            createSche([(ID,T1)|T]).
