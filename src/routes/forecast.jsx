import { createFileRoute } from '@tanstack/react-router'
import Forecast from '../components/Forecast'

export const Route = createFileRoute('/forecast')({
  component: Forecast,
})

