:-consult(kb).
:-dynamic error/1.

checkMargin():- retractall(error(_)),
                findall((A,X),rangehvd(_,A,X), S),
                findall(A,driverTimes(_,_,_,A,_), T),
                calculate(S,All),
                addT(T,Capability),
                addT(All,Charge),
                Q is Charge / Capability * 100,
                (Q > 80, asserta(error('Error in capability of schedules')), error(A), write(A);true)
                .

calculate([],[]).
calculate([(H,A)|Start], [Aux|All]):-Aux is A-H,
                                    calculate(Start, All).

addT([],0).
addT([H|Tail], Sum):- addT(Tail,X), Sum is H + X.