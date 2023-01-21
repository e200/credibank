const express = require('express')

const app = express()

const creditAccounts = []

app.get('/check/:credit_account_id/ammount/:ammount', (req, res) => {
  const creditAccountId = req.params.credit_account_id
  const ammount = Number(req.params.ammount)

  if (!creditAccounts[creditAccountId]) {
    creditAccounts[creditAccountId] = {
      availableAmmount: 10000,
      checks: [],
    }
  }

  const check = {
    id: Math.random() * 10000000000000000,
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
