"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save } from "lucide-react"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold dark:text-white">Settings</h1>
          <p className="text-muted-foreground dark:text-gray-400">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="general" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
              General
            </TabsTrigger>
            <TabsTrigger value="appearance" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">General Settings</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Manage your basic account settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="store-name" className="dark:text-gray-300">
                        Store Name
                      </Label>
                      <Input
                        id="store-name"
                        defaultValue="ShopAdmin Store"
                        className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="store-url" className="dark:text-gray-300">
                        Store URL
                      </Label>
                      <Input
                        id="store-url"
                        defaultValue="shopadmin.com"
                        className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="store-description" className="dark:text-gray-300">
                      Store Description
                    </Label>
                    <Input
                      id="store-description"
                      defaultValue="Premium e-commerce store for all your needs"
                      className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="currency" className="dark:text-gray-300">
                        Currency
                      </Label>
                      <Select defaultValue="inr">
                        <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                          <SelectItem value="inr" className="dark:text-gray-300">
                            Indian Rupee (₹)
                          </SelectItem>
                          <SelectItem value="usd" className="dark:text-gray-300">
                            US Dollar ($)
                          </SelectItem>
                          <SelectItem value="eur" className="dark:text-gray-300">
                            Euro (€)
                          </SelectItem>
                          <SelectItem value="gbp" className="dark:text-gray-300">
                            British Pound (£)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timezone" className="dark:text-gray-300">
                        Timezone
                      </Label>
                      <Select defaultValue="ist">
                        <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                          <SelectItem value="ist" className="dark:text-gray-300">
                            Indian Standard Time (IST)
                          </SelectItem>
                          <SelectItem value="pst" className="dark:text-gray-300">
                            Pacific Standard Time (PST)
                          </SelectItem>
                          <SelectItem value="est" className="dark:text-gray-300">
                            Eastern Standard Time (EST)
                          </SelectItem>
                          <SelectItem value="gmt" className="dark:text-gray-300">
                            Greenwich Mean Time (GMT)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Appearance Settings</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Customize the look and feel of your dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dark-mode" className="dark:text-gray-300 font-medium">
                        Dark Mode
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Enable dark mode for the dashboard</p>
                    </div>
                    <Switch id="dark-mode" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compact-mode" className="dark:text-gray-300 font-medium">
                        Compact Mode
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Reduce spacing and padding in the UI</p>
                    </div>
                    <Switch id="compact-mode" />
                  </div>
                  <div>
                    <Label htmlFor="primary-color" className="dark:text-gray-300 font-medium">
                      Primary Color
                    </Label>
                    <div className="mt-2 grid grid-cols-5 gap-2">
                      <div className="h-10 w-10 rounded-full bg-purple-600 cursor-pointer ring-2 ring-offset-2 ring-purple-600"></div>
                      <div className="h-10 w-10 rounded-full bg-blue-600 cursor-pointer"></div>
                      <div className="h-10 w-10 rounded-full bg-green-600 cursor-pointer"></div>
                      <div className="h-10 w-10 rounded-full bg-red-600 cursor-pointer"></div>
                      <div className="h-10 w-10 rounded-full bg-orange-600 cursor-pointer"></div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="font-size" className="dark:text-gray-300 font-medium">
                      Font Size
                    </Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="small" className="dark:text-gray-300">
                          Small
                        </SelectItem>
                        <SelectItem value="medium" className="dark:text-gray-300">
                          Medium
                        </SelectItem>
                        <SelectItem value="large" className="dark:text-gray-300">
                          Large
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Notification Settings</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Configure how you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="dark:text-gray-300 font-medium">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications" className="dark:text-gray-300 font-medium">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications in the browser</p>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="order-notifications" className="dark:text-gray-300 font-medium">
                        Order Notifications
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications for new orders</p>
                    </div>
                    <Switch id="order-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="inventory-notifications" className="dark:text-gray-300 font-medium">
                        Inventory Alerts
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications for low stock</p>
                    </div>
                    <Switch id="inventory-notifications" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Security Settings</CardTitle>
                <CardDescription className="dark:text-gray-400">Manage your account security settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-password" className="dark:text-gray-300 font-medium">
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password" className="dark:text-gray-300 font-medium">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password" className="dark:text-gray-300 font-medium">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor" className="dark:text-gray-300 font-medium">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

