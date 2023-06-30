import express from 'express';
import planetsRoutes from './routes/planetsRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/planets', planetsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
