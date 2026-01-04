import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { announcements } from '../constants'

export function AnnouncementsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Announcements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {announcements.map((announcement, index) => (
          <div key={index} className="border-b last:border-b-0 pb-3 last:pb-0">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-sm">{announcement.title}</h4>
              <span className="text-xs text-gray-500">{announcement.date}</span>
            </div>
            <p className="text-sm text-gray-600">{announcement.content}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}