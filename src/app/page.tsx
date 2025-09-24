'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Page = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert('كلمات المرور غير متطابقة')
      return
    }

    if (!email || !password) {
      alert('يرجى ملء جميع الحقول')
      return
    }

    // Simple registration - accept any email and password
    console.log('Admin registered:', { email, password })
    
    // Redirect to admin dashboard
    router.push('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">تسجيل المدير</CardTitle>
          <CardDescription className="text-center">
            إنشاء حساب مدير جديد
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                عنوان البريد الإلكتروني
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                كلمة المرور
              </label>
              <Input
                id="password"
                type="password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                تأكيد كلمة المرور
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="أكد كلمة المرور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="pt-6">
            <Button type="submit" className="w-full">
              تسجيل المدير
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Page