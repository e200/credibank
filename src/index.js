const express = require('express')

const app = express()

const creditAccounts = []

const createCreditAccount = (accountId) => {
  creditAccounts[accountId] = {
    availableAmmount: 10000,
    checks: [],
  }
}

app.get('/check/:credit_account_id', (req, res) => {
  const creditAccountId = req.params.credit_account_id

  if (!creditAccounts[creditAccountId]) {
    createCreditAccount(creditAccountId)
  }

  res.send(creditAccounts[creditAccountId])
})

app.get('/check/:credit_account_id/ammount/:ammount', (req, res) => {
  const creditAccountId = req.params.credit_account_id
  const ammount = Number(req.params.ammount)

  if (!creditAccounts[creditAccountId]) {
    createCreditAccount(creditAccountId)
  }

  const check = {
    id: Math.floor(Math.random() * 10000000000000000),
    ammount,
  }

  creditAccounts[creditAccountId].checks.push(check)

  creditAccounts[creditAccountId].availableAmmount -= ammount

  res.send({
    checkId: check.id,
    date: (new Date()),
  })
})

app.listen(8080, () => {
  console.log('App is listen on port 8080');
})
