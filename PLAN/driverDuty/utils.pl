%convert hours to minutes and seconds
hours_to_minutes_seconds(H,M,S):-
    M is H*60,
    S is M*60.

%Eliminates an element n times from a list
eliminate_n_times(_,N,List,Result):-(N=0;List=[],Result=List).
eliminate_n_times(Elem,N,[Elem|List],Result):-
    N1 is N-1,
    eliminate_n_times(Elem,N1,List,Result).
eliminate_n_times(Elem,N,[X|List], [X|Result]):-
    eliminate_n_times(Elem,N,List,Result),!.

%Generates 2 index between 1 and the length
generate_cut(Length,Random1,Random2):-
    Length1 is Length +1,
    random_2_diff(1,Length1,R1,R2),
    (R1<R2,Random1 is R1,Random2 is R2,!
    ;
    R1>R2,Random1 is R2, Random2 is R1),!.

%Generates 2 random number between the limits given
random_2_diff(Lim1,Lim2,R1,R2):-
    random(Lim1, Lim2, Random1),
    random(Lim1, Lim2, Random2),
    (Random2 \== Random1,R1 is Random1,R2 is Random2,!;random_2_diff(Lim1,Lim2,R1,R2)).
    
%Retracts all elements from list that are in sublist
subtract_sublist(Result,[],Result).
subtract_sublist(List,[H|SubList],Result):-
    remove_last(List,H,NewList),
    subtract_sublist(NewList,SubList,Result),!.

%Removes last element from list and returns it and the result list
remove_last(List,H,Result):-
    reverse(List,ReversedList),
    remove_first(ReversedList,H,ReversedResult),
    reverse(ReversedResult,Result),!.

%Removes first element from list and returns it and the result list
remove_first([],_,[]).
remove_first([H|Result],H,Result).
remove_first([X|List],H,[X|Result]):-remove_first(List,H,Result).

%Returns the sublist of cut1 and cut2(Excluding both)
sublist(List,Cut1,Cut2,SubList):-
    Cut1_1 is Cut1 +1,
    Cut2_1 is Cut2 -1,
    sublist1(List,Cut1_1,Cut2_1,SubList),!.

sublist1(List,1,Cut2,SubList):-sublist2(List,Cut2,SubList),!.
sublist1([_|List],Cut1,Cut2,SubList):-
    Cut1_1 is Cut1 -1,
    Cut2_1 is Cut2 -1,
    sublist1(List,Cut1_1,Cut2_1,SubList).

%Continues sublist from cut1
sublist2(_,0,[]).
sublist2([H|List],Cut2,[H|SubList]):-
    Cut2_1 is Cut2 -1,
    sublist2(List,Cut2_1,SubList).

%Generates a random number between min and max but different from diff
random_diff(Min,Max,Diff,Random):-
    random(Min, Max, RandomT),
    (RandomT=Diff,random_diff(Min,Max,Diff,Random);Random is RandomT).

%Rotates to the right N times
rotate_right(List,N,RotatedList):-
    length(List, Length),
    N1 is Length - N,
    rotate_left(List,N1,RotatedList).

%Rotates to the left N times 
rotate_left(RotatedList,0,RotatedList):-!.
rotate_left([H|List],N,RotatedList):-
    N1 is N-1,
    append(List,[H],ListT),
    rotate_left(ListT,N1,RotatedList).
    
%Write array by elements
write_array([]).
write_array([H|T]):-
    writeln(H),write_array(T).

%Generates a permutation of the given list
shuffle_different(Ind1,Ind2):-
    random_permutation(Ind1,Permutation),
    (Permutation - Ind1,shuffle_different(Ind1,Ind2)
    ;
    Ind2=Permutation),!.

%Splits the given array in the given element
split(_,[],[],[]).
split(0,L,[],L).
split(N,[H|Pop],[H|Best],Rest):-
    N1 is N-1,
    split(N1,Pop,Best,Rest),!.