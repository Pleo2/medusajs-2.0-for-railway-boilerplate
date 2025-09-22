# MedusaJS 2.0 Backend

[![Medusa Version](https://img.shields.io/badge/Medusa-2.10.2-blue.svg)](https://medusajs.com)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful, modular e-commerce backend built with MedusaJS 2.0, pre-configured for seamless deployment on Railway.app. This backend serves as the core of your e-commerce platform, handling products, orders, payments, notifications, and more.

## 🚀 Features

### Core Modules
- **Product Management**: Complete product catalog with variants, categories, and collections
- **Order Processing**: Robust order lifecycle management with workflows
- **Customer Management**: User accounts, addresses, and order history
- **Cart & Checkout**: Flexible cart system with multiple payment options
- **Admin Dashboard**: Built-in admin interface for store management

### Pre-configured Integrations

#### 📧 Email Notifications
- **Resend Integration**: Modern email delivery with React Email templates
- **Templates Included**:
  - Order confirmation emails
  - User invitation emails
  - Customizable base templates
- **Setup Video**: [Watch here](https://youtu.be/pbdZm26YDpE?si=LQTHWeZMLD4w3Ahw)

#### 💳 Payment Processing
- **Stripe Integration**: Secure payment processing
- **Webhook Support**: Automatic payment status updates
- **Setup Video**: [Watch here](https://youtu.be/dcSOpIzc1Og)

#### 🗄️ File Storage
- **MinIO Integration**: Cloud-native object storage
- **Automatic Bucket Creation**: 'medusa-media' bucket for media files
- **Fallback**: Local storage for development

#### 🔍 Search & Discovery
- **MeiliSearch Integration**: Fast, typo-tolerant product search
- **Auto-configuration**: Works out-of-the-box on Railway
- **Setup Video**: [Watch here](https://youtu.be/hrXcc5MjApI)

#### 🗃️ Database & Caching
- **PostgreSQL**: Production-ready database
- **Redis**: High-performance caching and session management
- **Automatic Setup**: Railway handles infrastructure provisioning

## 🛠️ Tech Stack

- **Framework**: MedusaJS 2.0
- **Language**: TypeScript
- **Database**: PostgreSQL with MikroORM
- **Cache**: Redis
- **File Storage**: MinIO S3-compatible
- **Search**: MeiliSearch
- **Email**: Resend
- **Payments**: Stripe

## 📁 Project Structure

```
backend/
├── src/
│   ├── admin/          # Admin dashboard configuration
│   ├── api/            # API routes and endpoints
│   │   ├── admin/      # Admin-only endpoints
│   │   ├── store/      # Storefront endpoints
│   │   └── key-exchange/ # Key exchange for secure communication
│   ├── jobs/           # Background jobs
│   ├── lib/            # Core utilities and constants
│   ├── modules/        # Custom modules
│   │   ├── email-notifications/  # Email service
│   │   └── minio-file/           # File storage service
│   ├── scripts/        # Database seeding and build scripts
│   ├── subscribers/    # Event subscribers
│   ├── utils/          # Utility functions
│   └── workflows/      # Business logic workflows
├── medusa-config.js    # Main configuration file
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js ≥18.0.0
- PostgreSQL database
- Redis instance
- MinIO storage (optional, falls back to local)
- MeiliSearch (optional, for search functionality)

### Local Development Setup

1. **Install Dependencies**
   ```bash
   cd backend
   pnpm install
   # or
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.template .env
   # Edit .env with your configuration
   ```

3. **Database Setup**
   ```bash
   # Initialize database with migrations and seed data
   pnpm run ib
   # or
   npm run ib
   ```

4. **Start Development Server**
   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

The backend will start on `http://localhost:9000` with the admin dashboard at `http://localhost:9000/app`.

### Production Build

```bash
pnpm run build
pnpm run start
```

## ⚙️ Configuration

### Environment Variables

Key environment variables (see `.env.template`):

- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection URL
- `JWT_SECRET`: JWT signing secret
- `COOKIE_SECRET`: Session cookie secret
- `STRIPE_API_KEY`: Stripe secret key
- `RESEND_API_KEY`: Resend API key
- `MINIO_*`: MinIO/S3 configuration
- `MEILISEARCH_*`: MeiliSearch configuration

### Railway Deployment

This backend is optimized for [Railway.app](https://railway.app) deployment:

1. Use the [one-click template](https://railway.app/template/gkU-27?referralCode=-Yg50p)
2. Railway automatically provisions PostgreSQL, Redis, and MinIO
3. Environment variables are auto-configured
4. MeiliSearch is included in the stack

#### 🚀 Deployment Order

For proper deployment on Railway, ensure services start in this order:

1. **PostgreSQL Database** - Start first to ensure data persistence
2. **MeiliSearch** - Start before backend to enable search functionality
3. **Backend** - Start after database and MeiliSearch are ready
4. **Storefront** - Start last as it depends on the backend API

Railway's template handles this automatically, but if deploying manually, follow this sequence to avoid connection errors.

## 📡 API Endpoints

### Store API (`/store/*`)
- Product catalog and search
- Cart management
- Customer accounts
- Order placement

### Admin API (`/admin/*`)
- Product and inventory management
- Order processing
- Customer management
- Analytics and reporting

### Custom Endpoints
- `/store/custom/*`: Custom storefront endpoints
- `/admin/custom/*`: Custom admin endpoints
- `/key-exchange/*`: Secure key exchange

## 🔧 Development

### Available Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run seed` - Seed database with sample data
- `pnpm run ib` - Initialize backend (migrations + seed)
- `pnpm run email:dev` - Preview email templates

### Custom Modules

#### Email Notifications Module
Located in `src/modules/email-notifications/`
- Uses Resend for delivery
- React Email for template rendering
- Customizable templates in `templates/`

#### MinIO File Module
Located in `src/modules/minio-file/`
- S3-compatible file storage
- Automatic bucket management
- Fallback to local storage

### Workflows & Subscribers

- **Workflows**: Business logic orchestration in `src/workflows/`
- **Subscribers**: Event-driven actions in `src/subscribers/`
- **Jobs**: Background processing in `src/jobs/`

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

## 📚 Resources

- [MedusaJS Documentation](https://docs.medusajs.com/)
- [MedusaJS 2.0 Migration Guide](https://docs.medusajs.com/v2/)
- [Railway Deployment Guide](https://funkyton.com/medusajs-2-0-is-finally-here/)
- [Stripe Payment Setup](https://youtu.be/dcSOpIzc1Og)
- [Email Setup with Resend](https://youtu.be/pbdZm26YDpE?si=LQTHWeZMLD4w3Ahw)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- [MedusaJS](https://medusajs.com) for the amazing framework
- [Railway](https://railway.app) for hosting infrastructure
- [aleciavogel](https://github.com/aleciavogel) for Resend integration
- [rokmohar](https://github.com/rokmohar) for MeiliSearch plugin
- [FUNKYTON](https://funkyton.com) for the boilerplate template

---

Built with ❤️ using MedusaJS 2.0</content>
<parameter name="filePath">/home/pleo2/dev/github-pleo2/medusajs-2.0-for-railway-boilerplate/backend/README.md
