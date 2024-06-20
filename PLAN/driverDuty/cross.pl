:-consult(utils).

cross([],[]).
cross([Ind*_],[Ind]).
cross(Pop,[H1,H2|Tail]):-
    length(Pop, Length),
    Length1 is Length + 1,
    random_2_diff(1,Length1,Index1,Index2),
    nth1(Index1,Pop,Ind1*_),
    nth1(Index2,Pop,Ind2*_),
    remove_first(Pop,Ind1*_,Pop1),
    remove_first(Pop1,Ind2*_,Pop2),
    cross1(Ind1,Ind2,H1,H2),
    cross(Pop2,Tail),!.

cross1(Ind1,Ind2,NInd1,NInd2):-
    length(Ind1, Length),
    generate_cut(Length,Cut1,Cut2),
    (prob_cruzamento(Pcross);Pcross is 1),
    random(0.0, 1.0, P),
    (P=<Pcross,!,
        cross2(Ind1,Ind2,Cut1,Cut2,NInd1),
        cross2(Ind2,Ind1,Cut1,Cut2,NInd2)
        ;
        NInd1=Ind1,NInd2=Ind2
    ).

cross2(Ind1,Ind2,Cut1,Cut2,Cross):-
    length(Ind1, Length),
    sublist(Ind1,Cut1,Cut2,SubList),
    Rotate is Length - Cut2,
    rotate_right(Ind2,Rotate,Ind2Rotated),
    subtract_sublist(Ind2Rotated,SubList,Ind2Rot),
    append(Ind2Rot,SubList,NewList),
    rotate_left(NewList,Rotate,Cross).
    
    
    