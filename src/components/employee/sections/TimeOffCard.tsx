import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { timeOffData } from '../constants'

interface TimeOffCardProps {
  onNavigate?: (page: string) => void
}

export function TimeOffCard({ onNavigate }: TimeOffCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Time-Off Balances</CardTitle>
        <Button 
          variant="link" 
          className="text-blue-600 p-0"
          onClick={() => onNavigate?.('time-off')}
        >
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {timeOffData.map((item) => (
          <div key={item.type} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-gray-700">{item.type}</span>
            </div>
            <span className="font-semibold">{item.balance} {item.unit}</span>
          </div>
        ))}
        <Button 
          className="w-full mt-4 bg-gray-900 hover:bg-gray-800"
          onClick={() => onNavigate?.('time-off')}
        >
          Request Time Off
        </Button>
      </CardContent>
    </Card>
  )
}