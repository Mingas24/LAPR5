% node(nome_paragem, abrev_paragem, flag_ponto_rendicao,flag_estacao_recolha, longitude, latitude)

node("Aguiar de Sousa", "AGUIA", t, f,-8.4464785432391, 41.1293363229325).
node("Arreigada","ARREI",t,f,-8.393587,41.250895).
node("Astromil","ASTRO",t,f,-8.415594,41.196152).
node("Baltar", "BALTR", t, f, -8.38716802227697, 41.1937898023744).
node("Besteiros", "BESTR", t, f, -8.34043029659082, 41.217018845589).
node("Bitaraes","BITAR",t,f,-8.314376,41.225976).
node("Castelo","CASTE",t,f,-8.367174,41.194095).
node("Cete", "CETE", t, f, -8.35164059584564, 41.183243425797).
node("Cristelo", "CRIST", t, f, -8.34639896125324, 41.2207801252676).
node("Duas Igrejas", "DIGRJ", t, f, -8.35481024956726, 41.2278665802794).
node("Estacao (Lordelo)", "ESTLO", t, t, -8.4227924957086, 41.2521157104055).
node("Estacao (Paredes)", "ESTPA", t, t, -8.33448520831829, 41.2082119860192).
node("Figueira de Porta","FIGPO",t,f,-8.382885,41.189855).
node("Gandra", "GAND", t, f, -8.43958765792976, 41.1956579348384).
node("Gondalaes","GONDA",t,f,-8.334362,41.228758).
node("Lordelo", "LORDL", t, f, -8.42293614720057, 41.2452627470645).
node("Louredo","LOURE",t,t,-8.338563,41.237989).
node("Modelos","MODEL",t,f,-8.385239,41.259556).
node("Mouriz", "MOURZ", t, f, -8.36577272258403, 41.1983610215263).
node("Parada de Todeia", "PARAD", t, f, -8.37023578802149, 41.1765780321068).
node("Paredes", "PARED", t, f, -8.33566951069481, 41.2062947118362).
node("Rebordosa","REBOR",t,f,-8.416698,41.215547).
node("Recarei", "RECAR", t, f, -8.42215867462191, 41.1599363478137).
node("Sobreira","SOBRE",t,f,-8.383333,41.15).
node("Sobrosa", "SOBRO", t, f, -8.38118071581788, 41.2557331783506).
node("Vandoma", "VANDO", t, f, -8.34160692293342, 41.2328015719913).
node("Vila Cova de Carros", "VCCAR", t, f, -8.35109395257277, 41.2090666564063).
node("Vilela","VILEL",t,f,-8.383015,41.243433).

% line(nome_linha, numero_linha, lista_abrev_paragens,tempo_minutos,distancia_metros).

line("Aguiar_Paredes", 1, ["AGUIA","RECAR", "PARAD","ASTRO","BALTR","CETE", "PARED"], 31, 15700).
line("Paredes_Aguiar", 2, ["PARED", "CETE","BALTR","ASTRO","PARAD", "RECAR", "AGUIA"], 31, 15700).
line("Gandra_Paredes", 3 , ["GAND", "VANDO","MODEL","PARAD","RECAR", "BALTR", "MOURZ", "PARED"], 26, 13000).
line("Paredes_Gandra", 4, ["PARED","ARREI", "MOURZ", "BALTR", "VANDO", "GAND"], 26, 13000).
line("Lordelo_Paredes", 5, ["LORDL","VANDO", "BALTR", "MOURZ","ARREI","PARED"], 29, 14300).
line("Paredes_Lordelo", 6, ["PARED","MOURZ", "BALTR", "VANDO", "LORDL"], 29, 14300).
line("Lordelo_Parada", 7, ["LORDL", "DIGRJ","ARREI", "CRIST", "VCCAR", "BALTR", "PARAD"], 22, 11000).
line("Parada_Lordelo", 8, ["PARAD", "BARTR", "VCCAR", "CRIST","ARREI", "DIGRJ", "LORDL"], 22, 11000).
line("Cristelo_Baltar", 9, ["CRIST", "VCCAR", "BALTR"], 8, 4000).
line("Baltar_Cristelo", 10, ["BARTR", "VCCAR", "CRIST"], 8, 4000).
line("Sobrosa_Cete", 12, ["SOBRO", "CRIST", "BESTR", "VCCAR", "MOURZ", "CETE"], 23, 11500).
line("Cete_Sobrosa", 13, ["CETE", "MOURZ", "VCCAR", "BESTR", "CRIST", "SOBRO"], 23, 11500).
line("Estacao(Lordelo)_Lordelo",14,["ESTLO","LORDL"], 2,1500).
line("Lordelo_Estacao(Lordelo)",15,["LORDL","ESTLO"], 2,1500).
line("Estacao(Lordelo)_Sobrosa",16,["ESTLO","SOBRO"], 5,1500).
line("Sobrosa_Estacao(Lordelo)",17,["SOBRO","ESTLO"], 5,1800).
line("Estacao(Paredes)_Paredes",18,["ESTPA","PARED"], 2,1500).
line("Paredes_Estacao(Paredes)",19,["PARED","ESTPA"], 2,1500).
line("Louredo_Arreigada",20,["LOURE","CRIST","DIGRJ","VILEL","ARREI"],19,7000).
line("Arreigada_Louredo",28,["ARREI","VILEL","DIGRJ","CRIST","LOURE"],19,7000).
line("Cete_Lordelo",21,["CETE","MOURZ","BALTR","VANDO","ASTRO","LORDL"],27,15900).
line("Lordelo_Cete",29,["LORDL","ASTRO","VANDO","BALTR","MOURZ","CETE"],27,15900).
line("Arreigada_Sobrosa",22,["ARREI","MODEL","GONDA","VILEL","SOBRO"],12,6000).
line("Sobrosa_Arreigada",30,["SOBRO","VILEL","GONDA","MODEL","ARREI"],12,6000).
line("Sobrosa_Baltar",23,["SOBRO","CRIST","VCCAR","BALTR"],20,9200).
line("Baltar_Sobrosa",31,["BALTR","VCCAR","CRIST","SOBRO"],20,9200).
line("Sobrosa_Paredes",24,["SOBRO","BESTR","VCCAR","CRIST","PARED"],18,8300).
line("Paredes_Sobrosa",32,["PARED","CRIST","VCCAR","BESTR","SOBRO"],18,8300).
line("Baltar_Paredes",25,["BALTR","FIGPO","CASTE","MOURZ","PARED"],15,6600).
line("Paredes_Baltar",33,["PARED","MOURZ","CASTE","FIGPO","BALTR"],15,6600).
line("Sobreira_Baltar",26,["SOBRE","AGUIA","RECAR","GAND","ASTRO","VANDO","BALTR"],30,19000).
line("Baltar_Sobreira",35,["BALTR","VANDO","ASTRO","GAND","RECAR","AGUIA","SOBRE"],30,19000).
line("Sobreira_Paredes",27,["SOBRE","RECAR","AGUIA","GAND","CETE","PARED"],30,22300).
line("Paredes_Sobreira",34,["PARED","CETE","GAND","AGUIA","RECAR","SOBRE"],30,22300).

%schedule(Path ID, [Tempo de passagem nos nós, ...])

schedule(6,[73800,74280,74580,74880,75420]).
schedule(4,[72000,72480,72780,73080,73620]).