import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.transitVote.deleteMany();
  await prisma.transitPost.deleteMany();
  await prisma.listingImage.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.task.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  const student = await prisma.user.create({
    data: {
      name: 'Alex Johnson',
      email: 'alex@university.edu',
      password: hashedPassword,
      university: 'State University',
    },
  });

  const course1 = await prisma.course.create({
    data: {
      userId: student.id,
      name: 'Data Structures & Algorithms',
      code: 'CS 201',
      instructor: 'Dr. Alan Turing',
      meetingTimes: 'MWF 10:00 AM - 11:15 AM',
      semester: 'Fall 2026',
    },
  });

  const course2 = await prisma.course.create({
    data: {
      userId: student.id,
      name: 'Introduction to Artificial Intelligence',
      code: 'CS 480',
      instructor: 'Dr. Grace Hopper',
      meetingTimes: 'TTh 2:00 PM - 3:30 PM',
      semester: 'Fall 2026',
    },
  });

  const now = new Date();
  const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const tenDaysFromNow = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);

  await prisma.task.createMany({
    data: [
      {
        userId: student.id,
        courseId: course1.id,
        title: 'Implement Red-Black Tree in C++',
        description: 'Complete insert and delete rotations with unit test coverage.',
        dueDate: threeDaysFromNow,
        weight: 15.0,
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        estimateMin: 180,
        isMilestone: true,
      },
      {
        userId: student.id,
        courseId: course2.id,
        title: 'Neural Network Forward Propagation Paper',
        description: 'Write a 3-page summary on backpropagation mathematics.',
        dueDate: tenDaysFromNow,
        weight: 20.0,
        status: 'TODO',
        priority: 'MEDIUM',
        estimateMin: 120,
        isMilestone: false,
      },
    ],
  });

  await prisma.transitPost.create({
    data: {
      userId: student.id,
      type: 'SHUTTLE_DELAY',
      routeTag: 'Green Line',
      title: 'Green Line delayed by 15 mins',
      details: 'Traffic accident near the main library roundabout slowing buses down.',
      upvotes: 8,
      expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000),
    },
  });

  await prisma.listing.create({
    data: {
      userId: student.id,
      title: 'Introduction to Algorithms (CLRS) - 4th Edition',
      description: 'Barely used, no highlights or markings. Perfect condition for CS 201.',
      price: 45.0,
      category: 'BOOKS',
      condition: 'LIKE_NEW',
      location: 'Engineering Quad',
      status: 'ACTIVE',
      images: {
        create: [{ url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80' }],
      },
    },
  });

  console.log('Database seeded successfully with demo data!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });