import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import { connectDB } from '../config/db.js';

dotenv.config();

const seedAdmins = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB for Admin Seeding...');

    // Pre-approved Admin Credentials
    const preapprovedAdmins = [
      {
        name: 'VASANA Master Admin',
        email: 'admin@vasana.com',
        password: 'AdminPassword123!',
        role: 'super_admin'
      },
      {
        name: 'VASANA Store Director',
        email: 'director@vasana.com',
        password: 'DirectorPassword123!',
        role: 'admin'
      }
    ];

    for (const adm of preapprovedAdmins) {
      const existing = await Admin.findOne({ email: adm.email });
      if (!existing) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(adm.password, salt);
        
        await Admin.create({
          name: adm.name,
          email: adm.email,
          passwordHash,
          role: adm.role
        });
        console.log(`✅ Created Pre-Approved Admin: ${adm.email} (${adm.role})`);
      } else {
        console.log(`ℹ️ Admin already exists: ${adm.email}`);
      }
    }

    console.log('Admin seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admins:', error);
    process.exit(1);
  }
};

seedAdmins();
