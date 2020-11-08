import requests
import json
import os
base_url = 'https://api.liquipedia.net/api/v1/'

# possible endpoints: datapoint, game, match, matchfeed, placement, player, team, tournament, transfer

base_header = {
	'wiki':'leagueoflegends', 
	'apikey': os.environ.get('LIQUIPEDIA'),
	# 'query': 'opponent1, opponent2, winner, tournament, series',
	# 'type': 'team',
	# 'type': 'tournament',
	# 'name': 'Team Liquid',
	# 'name': '2020 World Championship',
	'limit': 5000
}

def makeRequest(endpoint, extraHeaders):
	combinedHeaders = { **base_header, **extraHeaders }
	#if extraHeaders:
	#	combinedHeaders = base_header.update(extraHeaders)
	#else:
	#	combinedHeaders = base_header

	print(combinedHeaders)

	response = requests.post(base_url + endpoint, data = combinedHeaders)
	print("Got Response: ", response)

	return response.json()["result"]

def getListOfTournaments():
	data = makeRequest('tournament', {})
	ret = []

	for tournament in data:
		ret.append(tournament['name'])
	return ret

def getListOfTournamentsByTier(tier):
	data = makeRequest('tournament', {'conditions': '[[liquipediatier::{}]]'.format(1), 'groupBy': 'name ASC'})
	ret = []

	for tournament in data:
		ret.append(tournament['name'])
	return ret

def getMatchesForATournament(series):
	data = makeRequest('match', {'conditions': '[[parentname::{}]]'.format(series)})

	return data

def getMatchesForATournamentForATeam(series, team):
	data = makeRequest('match', {'conditions': '[[parentname::{}]] AND ([[opponent1::{}]] OR [[opponent2::{}]])'.format(series, team, team), 'query': 'objectname'})

	print("=============== matches for {} ==================".format(series))
	print(data)

	return data

def getAllMatchesForATeam(team, tier):
	#data = makeRequest('match', {'conditions': '[[liquipediatier::{}]] AND ([[opponent1::{}]] OR [[opponent2::{}]]) AND [[winner::!]]'.format(tier, team, team), 'groupBy': 'pagename ASC'})
	#tournaments = getListOfTournamentsByTier(tier)
	#print(tournaments)
	data = makeRequest('matchfeed', {'type': 'team', 'name': team})

	#matches = []
	#for match in data:
	#	print(match['pagename'], match['objectname'])
	#	matches.append(match['objectname'])

	return data


	#matches = []
	#for t in tournaments:
	#	matches.extend(getMatchesForATournamentForATeam(t, team))
	#return matches
#print(getMatchesForATournamentForATeam('World Championship', 'Team Liquid'))
print(len(getAllMatchesForATeam('Team Liquid', 1)))


def getNumberOfTournaments(tier):
	data = makeRequest('tournament', {'conditions': '[[liquipediatier::{}]]'.format(tier), 'query': 'count::name', 'groupBy': 'name ASC'})

	print(data)


#getNumberOfTournaments(1)

def calculateTotalGamesAgainstOtherTeams(team):

	data = getAllMatchesForATeam(team, 1)

	cumulative = {}

	for game in data:
		teams = [game['opponent1'], game['opponent2']]
		if teams[0] != 'Team Liquid':
			if teams[0] in cumulative:
				cumulative[teams[0]][0] += 1
				if game['winner'] == '2':
					cumulative[teams[0]][1] += 1
			else:
				cumulative[teams[0]] = []
				cumulative[teams[0]].append(1) # number of games played
				if game['winner'] == '2':
					cumulative[teams[0]].append(1) # number of wins
				else:
					cumulative[teams[0]].append(0)
		else:
			if teams[1] in cumulative:
				cumulative[teams[1]][0] += 1
				if game['winner'] == '1':
					cumulative[teams[1]][1] += 1
			else:
				cumulative[teams[1]] = []
				cumulative[teams[1]].append(1)
				if game['winner'] == '1':
					cumulative[teams[1]].append(1) # number of wins
				else:
					cumulative[teams[1]].append(0)

		# print(game['opponent1'], game['opponent2'], "Winner: ", game['winner'])

	return cumulative


allMatches = calculateTotalGamesAgainstOtherTeams('Team Liquid')
print(allMatches)

for i in allMatches:
	print(i, (allMatches[i][1]/allMatches[i][0] * 100))

