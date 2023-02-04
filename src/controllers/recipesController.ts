import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from 'http-error-classes';
import Recipe from '../models/recipe';
import { RecipeParams } from '../schemas/recipeSchemas';
// import { ReadRecipeRequest } from '../schemas/recipeSchemas';

const createRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, description } : { title: string; description: string } = req.body;

  const recipe = new Recipe({
    // _id: new mongoose.Types.ObjectId(),
    title,
    description,
  });

  await recipe.save();
  res.status(201).json({ recipe });
};

const readRecipe = async (req: Request<RecipeParams>, res: Response, next: NextFunction): Promise<void> => {
  // const { id } : { id: string } = req.params;
  const id : string = req.params.id;

  const recipe = await Recipe.findById(id);

  if (!recipe) {
    throw new NotFoundError(`no recipe found with id ${id}`);
  }

  res.status(200).json({ recipe });

  // .then((author) => (author ? res.status(200).json({ author }) : res.status(404).json({ message: 'not found' })))
};

/* const readAll = (req: Request, res: Response, next: NextFunction) => Author.find()
  .then((authors) => res.status(200).json({ authors }))
  .catch((error) => res.status(500).json({ error }));

const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
  const { authorId } = req.params;

  return Author.findById(authorId)
    .then((author) => {
      if (author) {
        author.set(req.body);

        return author
          .save()
          .then((author) => res.status(201).json({ author }))
          .catch((error) => res.status(500).json({ error }));
      }
      return res.status(404).json({ message: 'not found' });
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
  const { authorId } = req.params;

  return Author.findByIdAndDelete(authorId)
    .then((author) => (author ? res.status(201).json({ author, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
    .catch((error) => res.status(500).json({ error }));
}; */

/* export default {
  createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor,
}; */

export default {
  createRecipe, readRecipe,
};
