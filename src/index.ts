
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import User from './models/user';

const app = express();
const PORT = 3000;

const mongoOptions: Record<string, any> = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  
  

mongoose.connect('mongodb://localhost:27017/Riad-database', mongoOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(bodyParser.json());


app.post('/api/users', async (req: Request, res: Response) => {
  try {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

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
    res.status(500).json({
      success: false,
      message: 'Internal server error',
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

app.put('/api/users/:userId/orders', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });

    if (user) {
      if (!user.orders) {
        user.orders = [];
      }

      user.orders.push({
        productName: req.body.productName,
        price: req.body.price,
        quantity: req.body.quantity,
      });

      await user.save();

      res.json({
        success: true,
        message: 'Order created successfully!',
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

app.get('/api/users/:userId/orders', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });

    if (user) {
      res.json({
        success: true,
        message: 'Order fetched successfully!',
        data: { orders: user.orders },
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


app.get('/api/users/:userId/orders/total-price', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });

    if (user) {
      const totalPrice = user.orders.reduce(
        (acc, order) => acc + order.price * order.quantity,
        0
      );

      res.json({
        success: true,
        message: 'Total price calculated successfully!',
        data: { totalPrice },
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
      message: 'error',
    });
  }
});

app.listen(PORT, () => {
  console.log(`running online http://localhost:${PORT}`);
});
