import mongoose from 'mongoose';

const solutionSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true, maxlength: 100 },
    categoria: { type: String, required: true, trim: true, maxlength: 60 },
    descripcion: { type: String, required: true, trim: true, maxlength: 500 },
  },
  { timestamps: true },
);

solutionSchema.set('toJSON', {
  transform: (_document, value) => {
    value.id = value._id.toString();
    delete value._id;
    delete value.__v;
    return value;
  },
});

export default mongoose.model('Solution', solutionSchema);
