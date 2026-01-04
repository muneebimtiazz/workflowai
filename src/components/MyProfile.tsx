import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Separator } from "./ui/separator"
import { Edit, Save } from 'lucide-react'
import { toast } from 'sonner'

interface ProfileData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    bio: string
  }
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  workInfo: {
    employeeId: string
    jobTitle: string
    department: string
    manager: string
    startDate: string
    workLocation: string
    workType: string
  }
  emergencyContacts: {
    primary: {
      name: string
      relationship: string
      phone: string
      email: string
    }
    secondary: {
      name: string
      relationship: string
      phone: string
      email: string
    }
  }
}

export function MyProfile() {
  const [profile, setProfile] = useState<ProfileData>({
    personalInfo: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1990-05-15',
      bio: 'Experienced software engineer with a passion for creating innovative solutions.'
    },
    address: {
      street: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    workInfo: {
      employeeId: 'EMP001',
      jobTitle: 'Senior Software Engineer',
      department: 'Engineering',
      manager: 'Sarah Johnson',
      startDate: '2020-03-15',
      workLocation: 'New York Office',
      workType: 'Hybrid'
    },
    emergencyContacts: {
      primary: {
        name: 'Jane Smith',
        relationship: 'Spouse',
        phone: '+1 (555) 987-6543',
        email: 'jane.smith@email.com'
      },
      secondary: {
        name: 'Robert Smith',
        relationship: 'Father',
        phone: '+1 (555) 456-7890',
        email: 'robert.smith@email.com'
      }
    }
  })

  const handleProfileChange = (section: keyof ProfileData, key: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const handleNestedProfileChange = (section: keyof ProfileData, subsection: string, key: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...(prev[section] as any)[subsection],
          [key]: value
        }
      }
    }))
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-muted-foreground">View and update your personal information</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="" alt={`${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`} />
              <AvatarFallback className="text-2xl">
                {profile.personalInfo.firstName.charAt(0)}{profile.personalInfo.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">{profile.personalInfo.firstName} {profile.personalInfo.lastName}</h3>
              <p className="text-muted-foreground">{profile.workInfo.jobTitle}</p>
              <p className="text-sm text-muted-foreground">{profile.workInfo.department}</p>
            </div>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Change Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profile.personalInfo.firstName}
                onChange={(e) => handleProfileChange('personalInfo', 'firstName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profile.personalInfo.lastName}
                onChange={(e) => handleProfileChange('personalInfo', 'lastName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.personalInfo.email}
                onChange={(e) => handleProfileChange('personalInfo', 'email', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={profile.personalInfo.phone}
                onChange={(e) => handleProfileChange('personalInfo', 'phone', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={profile.personalInfo.dateOfBirth}
                onChange={(e) => handleProfileChange('personalInfo', 'dateOfBirth', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={3}
              value={profile.personalInfo.bio}
              onChange={(e) => handleProfileChange('personalInfo', 'bio', e.target.value)}
              placeholder="Tell us about yourself..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
          <CardDescription>
            Your current residential address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={profile.address.street}
              onChange={(e) => handleProfileChange('address', 'street', e.target.value)}
              placeholder="123 Main St, Apt 4B"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={profile.address.city}
                onChange={(e) => handleProfileChange('address', 'city', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State / Province</Label>
              <Input
                id="state"
                value={profile.address.state}
                onChange={(e) => handleProfileChange('address', 'state', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP / Postal Code</Label>
              <Input
                id="zipCode"
                value={profile.address.zipCode}
                onChange={(e) => handleProfileChange('address', 'zipCode', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={profile.address.country}
              onChange={(e) => handleProfileChange('address', 'country', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Information</CardTitle>
          <CardDescription>
            Employment details and workplace information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                value={profile.workInfo.employeeId}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={profile.workInfo.jobTitle}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={profile.workInfo.department}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manager">Manager</Label>
              <Input
                id="manager"
                value={profile.workInfo.manager}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={profile.workInfo.startDate}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workLocation">Work Location</Label>
              <Input
                id="workLocation"
                value={profile.workInfo.workLocation}
                onChange={(e) => handleProfileChange('workInfo', 'workLocation', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workType">Work Type</Label>
              <Select value={profile.workInfo.workType} onValueChange={(value) => handleProfileChange('workInfo', 'workType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="On-site">On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
          <CardDescription>
            People to contact in case of emergency
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-4">Primary Contact</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryName">Name</Label>
                <Input
                  id="primaryName"
                  value={profile.emergencyContacts.primary.name}
                  onChange={(e) => handleNestedProfileChange('emergencyContacts', 'primary', 'name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryRelationship">Relationship</Label>
                <Input
                  id="primaryRelationship"
                  value={profile.emergencyContacts.primary.relationship}
                  onChange={(e) => handleNestedProfileChange('emergencyContacts', 'primary', 'relationship', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryPhone">Phone Number</Label>
                <Input
                  id="primaryPhone"
                  type="tel"
                  value={profile.emergencyContacts.primary.phone}
                  onChange={(e) => handleNestedProfileChange('emergencyContacts', 'primary', 'phone', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryEmail">Email Address</Label>
                <Input
                  id="primaryEmail"
                  type="email"
                  value={profile.emergencyContacts.primary.email}
                  onChange={(e) => handleNestedProfileChange('emergencyContacts', 'primary', 'email', e.target.value)}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-4">Secondary Contact</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="secondaryName">Name</Label>
                <Input
                  id="secondaryName"
                  value={profile.emergencyContacts.secondary.name}
                  onChange={(e) => handleNestedProfileChange('emergencyContacts', 'secondary', 'name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryRelationship">Relationship</Label>
                <Input
                  id="secondaryRelationship"
                  value={profile.emergencyContacts.secondary.relationship}
                  onChange={(e) => handleNestedProfileChange('emergencyContacts', 'secondary', 'relationship', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryPhone">Phone Number</Label>
                <Input
                  id="secondaryPhone"
                  type="tel"
                  value={profile.emergencyContacts.secondary.phone}
                  onChange={(e) => handleNestedProfileChange('emergencyContacts', 'secondary', 'phone', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryEmail">Email Address</Label>
                <Input
                  id="secondaryEmail"
                  type="email"
                  value={profile.emergencyContacts.secondary.email}
                  onChange={(e) => handleNestedProfileChange('emergencyContacts', 'secondary', 'email', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => toast.success('Profile saved successfully')} size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>
    </div>
  )
}