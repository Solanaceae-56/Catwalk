import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import regeneratorRuntime from "regenerator-runtime";
import '@testing-library/jest-dom';
import QuestionsAnswers from './QuestionsAnswers.jsx';

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greeting', async () => {
  render(<QuestionsAnswers />)

  expect(screen.findByTestId('questionmodule')).toHaveTextContent('Questions and Answers')
})