// userRoutes.ts

import express, { Request, Response } from 'express';
import User, { createUserSchema } from '../models/userModel';

const app = express();

app.use(express.json());

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    createUserSchema.parse(req.body);

    const user = await User.create(req.body);

    res.json({
      success: true,
      message: 'User created successfully!',
      data: {
        userId: user.userId,
        username: user.username,
        fullName: user.fullName,
        age: user.age,
        email: user.email,
        isActive: user.isActive,
        hobbies: user.hobbies,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: 'Invalid request body',
    });
  }
});

app.get('/api/users', async (_req: Request, res: Response) => {
  try {
    const users = await User.find({}, 'username fullName age email address');
    res.json({
      success: true,
      message: 'Users fetched successfully!',
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

app.get('/api/users/:userId', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ userId: req.params.userId }, '-password');
    if (user) {
      res.json({
        success: true,
        message: 'User fetched successfully!',
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

app.put('/api/users/:userId', async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true, select: '-password' }
    );

    if (user) {
      res.json({
        success: true,
        message: 'User updated successfully!',
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

app.delete('/api/users/:userId', async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({ userId: req.params.userId });

    if (user) {
      res.json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


const userRoutes = app;

export default userRoutes;