import { Router } from "express"
import { candidates, politicalParty } from "./db.js"
import { registerLog } from "./util.js";

const routes = Router()

routes.get("/candidates/:id", async (request, response) => {
  const username = request.headers['x-bolovo-username'] = 'Philipe'

  const { id } = request.params

  const candidate = candidates.filter((candidate) => candidate.id === parseInt(id))
  const party = politicalParty.filter(party => party.id === candidate[0].partyId)

  try {
    registerLog(username, 1)
  } catch (err) {
    console.log(err)
  }

  if (candidate.length > 0) {
    return response.status(200).json(
      {
        candidateId: candidate[0].id,
        candidateName: candidate[0].name,
        partyId: candidate[0].partyId,
        partyName: party[0].name,
        imageUrl: candidate[0].imageURL,
        votes: candidate[0].votes
      }
    );
  }

  return response.status(400).json({
    errMsg: "não foi possivel encontrar o candidado pelo id informado"
  })
});

routes.post("/votes/:id", async (request, response) => {
  const username = request.headers['x-bolovo-username'] = 'Philipe'

  const { candidateName, partyName } = request.body

  const { id } = request.params

  const candidateId = candidates.findIndex(item => item.id === parseInt(id))

  if (candidateId === -1) {
    return response.status(404).json(
      { errMsg: 'Não foi possivel votar no candidato.' }
    )
  }

  try {
    registerLog(username, 1)
  } catch (err) {
    console.log(err)
  }

  candidates[candidateId] = {
    ...candidates[candidateId],
    votes: candidates[candidateId].votes + 1,
  }

  const party = politicalParty.filter(party => party.id === candidates[candidateId].partyId)

  return response.status(201).json({
    msg: `${username} seu voto foi confirmado no ${candidateName} do ${party[0].name}`
  })
})

export { routes }