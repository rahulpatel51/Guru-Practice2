"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarDays, Camera, Edit, Mail, MapPin, Phone, Save, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSave = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setIsEditing(false)
    }, 1000)
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold dark:text-white">My Profile</h1>
            <p className="text-muted-foreground dark:text-gray-400">Manage your account settings and preferences</p>
          </div>
          <Button variant="outline" onClick={() => router.back()} className="dark:border-gray-600 dark:text-gray-300">
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="md:col-span-1 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Profile Picture</CardTitle>
              <CardDescription className="dark:text-gray-400">Update your profile photo</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-32 w-32 border-4 border-background dark:border-gray-900">
                  <AvatarImage src="/placeholder-user.jpg" alt="Admin User" />
                  <AvatarFallback className="text-2xl">AU</AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary">
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Upload new picture</span>
                </Button>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium dark:text-white">Admin User</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400">admin@example.com</p>
                <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">Administrator</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" className="w-full dark:border-gray-600 dark:text-gray-300">
                Change Photo
              </Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-2 dark:bg-gray-800 dark:border-gray-700">
            <Tabs defaultValue="personal">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="dark:text-white">Profile Information</CardTitle>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="dark:border-gray-600 dark:text-gray-300"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
                    Personal
                  </TabsTrigger>
                  <TabsTrigger value="security" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
                    Billing
                  </TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent>
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="fullName" className="dark:text-gray-300">
                        Full Name
                      </Label>
                      <div className="flex items-center mt-1">
                        <User className="mr-2 h-4 w-4 text-gray-400" />
                        <Input
                          id="fullName"
                          defaultValue="Admin User"
                          disabled={!isEditing}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="dark:text-gray-300">
                        Email Address
                      </Label>
                      <div className="flex items-center mt-1">
                        <Mail className="mr-2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          defaultValue="admin@example.com"
                          disabled={!isEditing}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone" className="dark:text-gray-300">
                        Phone Number
                      </Label>
                      <div className="flex items-center mt-1">
                        <Phone className="mr-2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          defaultValue="+1 (555) 123-4567"
                          disabled={!isEditing}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="dob" className="dark:text-gray-300">
                        Date of Birth
                      </Label>
                      <div className="flex items-center mt-1">
                        <CalendarDays className="mr-2 h-4 w-4 text-gray-400" />
                        <Input
                          id="dob"
                          type="date"
                          defaultValue="1990-01-01"
                          disabled={!isEditing}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address" className="dark:text-gray-300">
                      Address
                    </Label>
                    <div className="flex items-center mt-1">
                      <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                      <Input
                        id="address"
                        defaultValue="123 Main St, Anytown, CA 12345"
                        disabled={!isEditing}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio" className="dark:text-gray-300">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself"
                      defaultValue="E-commerce administrator with 5+ years of experience managing online retail platforms."
                      disabled={!isEditing}
                      className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="security" className="space-y-4">
                  {/* Security tab content */}
                </TabsContent>
                <TabsContent value="billing" className="space-y-4">
                  {/* Billing tab content */}
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}

