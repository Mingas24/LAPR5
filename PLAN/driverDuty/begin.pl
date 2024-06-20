:-consult(kb).
:-consult(utils).
:-consult(mutation).
:-consult(cross).
:-consult(generate).
:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic vehicleID/1.


%Percentage of the best individuals who pass, the rest are random
best_percentage(20).

%Maximum time of execution time 
max_time(1).

%Weight to stop the algorithm
lim_weight(0).

begin1(G,Pop,VID,PC,PM):-
	(retractall(geracoes(_));true),asserta(geracoes(G)),
	(retractall(populacao(_));true),asserta(populacao(Pop)),
	(retractall(vehicleID(_));true),asserta(vehicleID(VID)),
	(retractall(prob_cruzamento(_));true),asserta(prob_cruzamento(PC)),
	(retractall(prob_mutacao(_));true),asserta(prob_mutacao(PM)),!.

begin:-write('Number of new Generations: '),read(NG),
    (retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimension of Population: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Vehicle ID:'),read(VI),
	(retract(vehicleID(_));true), asserta(vehicleID(VI)),
	write('Probability of cross (%):'), read(P1),PC is P1/100, 
	(retract(prob_cruzamento(_));true), 	asserta(prob_cruzamento(PC)),
	write('Probability of mutation (%):'), read(P2),PM is P2/100, 
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)).


generate:- begin,
	get_time(Ti), %Gets current time
	(retract(begin_time(_));true),asserta(begin_time(Ti)), % Puts current time in the begin_time
	populacao(SPop), %Gets population number
	vehicleID(VehicleID), %Gets VehicleID
	geracoes(NGenerations), %Gets Number os generations
	initial_generate(VehicleID, SPop, Pop),
	evaluate_pop(Pop, PopCheck),
	order_Pop(PopCheck, PopOrdered),
	generate_generation(NGenerations, PopOrdered).

generate_server(G,TPop,VID,PC,PM,Ind):- begin1(G,TPop,VID,PC,PM),
	get_time(Ti), %Gets current time
	(retract(begin_time(_));true),asserta(begin_time(Ti)), % Puts current time in the begin_time
	populacao(SPop), %Gets population number
	vehicleID(VehicleID), %Gets VehicleID
	geracoes(NGenerations), %Gets Number os generations
	initial_generate(VehicleID, SPop, Pop),
	evaluate_pop(Pop, PopCheck),
	order_Pop(PopCheck, PopOrdered),
	generate_generation_server(NGenerations, PopOrdered,Ind),!.
	
generate_generation(N,Pop):-
	print_generation(Pop,N),
	check_end(N,Pop),!.

generate_generation(N,Pop):-
	cross(Pop,Sons),
	mutation(Sons,Mutants),
	evaluate_pop(Mutants, Evaluated),
	append(Pop,Evaluated,Population),
	order_Pop(Population, PopulationOrder),
	new_generation(PopulationOrder,NextGen),
	N1 is N-1,
	generate_generation(N1,NextGen),!.

generate_generation_server(_,[Ind|_],Ind).
	%print_generation(Pop,N),
	%check_end(N,Pop,Ind),!.

generate_generation_server(N,Pop):-
	cross(Pop,Sons),
	mutation(Sons,Mutants),
	evaluate_pop(Mutants, Evaluated),
	append(Pop,Evaluated,Population),
	order_Pop(Population, PopulationOrder),
	new_generation(PopulationOrder,NextGen),
	N1 is N-1,
	generate_generation(N1,NextGen),!.

new_generation(Pop,NextGen):-
	length(Pop, Length),
	best_percentage(N),N1 is N/200,M is 0.5-N1,
	NBest is round(Length*N1),NWorst is round(Length*M),
	split(NBest,Pop,Best,Rest),
	random_permutation(Rest,RestShuffled),
	split(NWorst,RestShuffled,Worst,_),
	append(Best,Worst,NextGen),!.

print_generation(Pop,N):-
	geracoes(G),
	N1 is G-N,
	nl, write('Generation '),writeln(N1),write_array(Pop),nl,
	!.

check_end(N,[Ind|Pop]):-
	(
		check_end_generation(N),
		writeln('Reached limit of generations!')
	;
		check_end_weight(Ind),
		writeln('Found desired weight!')
	;
		check_end_time,
		writeln('Reached time limit!')
	;
		check_end_stabilized_weight([Ind|Pop]),
		writeln('Populations are stabilized!')
	),
	writeln('Best Individual is:'),
	writeln(Ind),
	!.

check_end_generation(N):- N =<1.

check_end_weight(_*Weight):-
	lim_weight(X),Weight=<X,!.

check_end_time():-
	begin_time(Ti),
	get_time(Tf),
	Time is Tf-Ti,
	max_time(X),Lim is X*60,
	Time>=Lim,!.

check_end_stabilized_weight([_]).
check_end_stabilized_weight([_*Weight,_*Weight|Pop]):-
	check_end_stabilized_weight([_*Weight|Pop]).

