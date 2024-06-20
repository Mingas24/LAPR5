:-consult(utils).

mutation([],[]).
mutation([Ind|Pop],[Mutant|Rest]):-
    mutateInd(Ind,Mutant),
    mutation(Pop,Rest),!.

mutateInd(Ind,Mutant):-
    (
        check_prob_mut,
        length(Ind, Length),
        Length1 is Length +1,
        generate_cut(Length,Index1,Index2),
        sublist(Ind,0,Index1,Sub1),
        sublist(Ind,Index1,Index2,Sub2),
        sublist(Ind,Index2,Length1,Sub3),
        nth1(Index1,Ind,Gene1),
        nth1(Index2,Ind,Gene2),
        append(Sub1,[Gene2|Sub2],Half),
        append(Half,[Gene1|Sub3],Mutant),!
    ;
        Mutant = Ind
    ),!.

check_prob_mut:-
    random(0.0,1.0,Prob),
    (prob_mutacao(PM);PM is 1),
    Prob<PM,!.