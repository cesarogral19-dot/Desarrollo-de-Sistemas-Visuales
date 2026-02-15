import { test, expect } from 'vitest'
import { validateLogin, validateRegister, validateRequestForm } from '../middleware/validate'

test('validateLogin returns errors for empty fields', () => {
  const errs = validateLogin({ email: '', password: '' })
  expect(errs).toHaveProperty('email')
  expect(errs).toHaveProperty('password')
})

test('validateRegister enforces name, email and password length', () => {
  const errs = validateRegister({ name: '', email: '', password: '123' })
  expect(errs).toHaveProperty('name')
  expect(errs).toHaveProperty('email')
  expect(errs).toHaveProperty('password')
})

test('validateRequestForm enforces amount and description length', () => {
  const errs = validateRequestForm({ title: '', description: 'short', amount: 0 })
  expect(errs).toHaveProperty('title')
  expect(errs).toHaveProperty('description')
  expect(errs).toHaveProperty('amount')
})
