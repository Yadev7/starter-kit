import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('System') // Groups these endpoints under "System" in Swagger
@Controller()
export class AppController {
  
  // @Get()
  // @ApiOperation({ 
  //   summary: 'API Root', 
  //   description: 'Returns the status of the Yassine-Starter-Kit API' 
  // })
  // @ApiResponse({ status: 200, description: 'API is running successfully.' })
  // getHello() {
  //   return {
  //     name: 'Starter-Kit',
  //     version: '1.0.0',
  //     status: 'Active',
  //     author: 'Yassine',
  //     documentation: '/api/docs',
  //     message: 'Welcome to the core of your next big SaaS project! 🚀',
  //   };
  // }


  @Get()
@ApiOperation({ 
  summary: 'API Root', 
  description: 'Returns the metadata and health status of the Starter-Kit API' 
})
@ApiResponse({ status: 200, description: 'Service Information Retrieved' })
getHello() {
  return {
    openapi: '3.0.0', // إشارة إلى معيار التوثيق المستخدم
    info: {
      title: 'Yassine Starter Kit API',
      version: '1.0.0',
      description: 'The foundation for high-performance SaaS applications',
      contact: {
        name: 'Yassine',
        url: 'https://craftiverse.org', // رابط موقعك أو بورتفوليو الخاص بك
      },
    },
    server: {
      status: 'Online',
      environment: process.env.NODE_ENV || 'development',
      uptime: `${Math.floor(process.uptime())}s`,
    },
    links: {
      documentation: '/api/docs',
      health: '/api/v1/health',
      repository: 'https://github.com/your-repo', // اختياري
    },
    message: 'System is operational. 🚀',
  };
}
  @Get('health')
  @ApiOperation({ 
    summary: 'Health Check', 
    description: 'Detailed diagnostic information for server monitoring' 
  })
  @ApiResponse({ status: 200, description: 'Server is healthy.' })
  checkHealth() {
    return {
      status: 'OK',
      uptime: `${Math.floor(process.uptime())}s`,
      timestamp: new Date().toISOString(),
      memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024 + ' MB',
      environment: process.env.NODE_ENV || 'development',
    };
  }
}