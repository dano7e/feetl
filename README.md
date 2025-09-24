# Fleet Management Dashboard

A comprehensive and responsive fleet management system built with Next.js, TypeScript, TailwindCSS, and shadcn/ui components.

## 🚗 Features

### Dashboard Overview
- **Real-time fleet statistics** with summary cards showing:
  - Total cars in fleet
  - Cars currently in maintenance
  - Accidents reported this month
  - Total operational costs

### Vehicle Management
- **Comprehensive car tracking** with detailed information:
  - Car ID and plate numbers
  - Assigned drivers and owners
  - GPS status monitoring (online/offline)
  - Fuel levels with low-fuel alerts
  - Maintenance status and alerts
  - Traffic violations and accident counts
  - Budget tracking (spent vs. allocated)

### Smart Notifications System
- **Proactive alerts** for:
  - Expiring insurance and licenses
  - Predictive maintenance reminders
  - GPS tracking issues
  - Low fuel warnings
  - Budget overruns

### Driver Management
- **Driver profiles** including:
  - Personal information and contact details
  - Car assignments
  - Project assignments and managers
  - Violation tracking
  - License expiry monitoring

### Analytics & Reporting
- **Interactive charts** powered by Recharts:
  - Monthly fleet cost trends (line chart)
  - Vehicle utilization analysis (bar chart)
  - KM driven vs idle time comparison

### Modern UI/UX
- **Responsive design** that works on all devices
- **Clean, modern interface** with rounded corners and soft shadows
- **Grid-based layout** for optimal space utilization
- **Hover effects** and smooth transitions
- **Color-coded status indicators** for quick visual assessment

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended package manager)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd cars-app
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Run the development server**
```bash
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to view the dashboard.

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/
│   │   └── page.tsx          # Main dashboard page
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/
│   ├── ui/                   # shadcn/ui components
│   └── dashboard/            # Custom dashboard components
├── lib/
│   ├── utils.ts              # shadcn/ui utilities
│   └── dashboard-utils.ts    # Dashboard-specific utilities
└── types/
    └── fleet.ts              # TypeScript type definitions
```

## 🎨 Design Features

### Color Coding
- 🟢 **Green**: Good status, within budget, online
- 🟡 **Yellow**: Warning status, maintenance due, medium alerts
- 🔴 **Red**: Critical status, overdue maintenance, offline, high alerts

### Responsive Breakpoints
- **Mobile**: < 768px (stacked layout)
- **Tablet**: 768px - 1279px (2-column grid)
- **Desktop**: 1280px+ (full grid layout)

### Interactive Elements
- Hover effects on cards and buttons
- Smooth transitions and animations
- Visual feedback for user actions
- Responsive table with horizontal scroll on mobile

## 📊 Data Management

The dashboard currently uses mock data for demonstration. In a production environment, you would:

1. Replace mock data with API calls
2. Implement real-time data updates
3. Add data persistence
4. Include user authentication
5. Add role-based access control

## 🔧 Customization

### Adding New Features
1. **New components**: Add to `src/components/dashboard/`
2. **New utilities**: Add to `src/lib/dashboard-utils.ts`
3. **New types**: Update `src/types/fleet.ts`

### Styling Modifications
- Colors: Edit TailwindCSS classes in components
- Fonts: Modify `src/app/layout.tsx`
- Global styles: Update `src/app/globals.css`

## 📈 Performance Optimizations

- **Next.js App Router** for optimal routing
- **TypeScript** for type safety
- **Component-based architecture** for reusability
- **Responsive images** and optimized assets
- **Efficient re-rendering** with React best practices

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📋 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Future Enhancements

- [ ] Real-time GPS tracking integration
- [ ] Mobile app companion
- [ ] Advanced reporting and analytics
- [ ] Integration with fleet management APIs
- [ ] Multi-tenant support
- [ ] Advanced notification systems
- [ ] Maintenance scheduling automation
- [ ] Driver performance analytics
