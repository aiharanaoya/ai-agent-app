import { myAgent } from './agent.js'

const result = await myAgent.generate('こんにちは！自己紹介してください。')
console.log(result.text)
