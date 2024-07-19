import React from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import dishimg from '~/assets/Img/mexican chicken.png'
import Header from '../Header';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const recipeDetailsData = {
  1: {
    title: 'Som Tam Salad',
    submittedBy: 'Pickky03',
    updatedOn: 'May 17, 2024',
    prepTime: '10 mins',
    cooksTime: '20 mins',
    additionalTime: '15 mins',
    totalTime: '55 mins',
    servings: 6,
    ingredients: [
      '1 1/2 cups farro',
      '4 cups chicken broth',
      '1 teaspoon olive oil',
      '1 teaspoon sea salt, or to taste',
      '1¼ cup extra-virgin olive oil',
      '3 tablespoons fresh lemon juice',
      '1 tablespoon Greek seasoning',
      '1 clove garlic, minced',
      '1 cup seeded, diced tomato',
      '1 cup seeded, diced cucumber',
      '1 cup chopped red bell pepper',
      '3¼ cup thinly sliced red onion',
      '1 cup crumbled feta cheese',
      'salt and ground black pepper to taste',
    ],
    steps: [
      'Rinse farro with water; drain. Place farro in a pot; pour in chicken broth to cover farro by at least one inch, adding water if needed. Stir in 1 teaspoon olive oil and sea salt.',
      'Bring liquid to a boil; reduce heat to medium and simmer, uncovered, stirring frequently, until tender, about 35 minutes for whole grain farro or about 20 minutes for pearled farro.',
      'Drain farro, rinse with cold water, and set aside to cool completely, about 15 minutes.',
      'Meanwhile, whisk 1/4 cup extra-virgin olive oil, lemon juice, Greek seasoning, and garlic together in a large bowl. Stir in tomato, cucumber, red pepper, red onion, and feta cheese.',
      'Stir cooled farro into tomato mixture until completely coated with dressing; season with salt and pepper.',
    ],
  },
  // Add other recipes similarly
};

export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = recipeDetailsData[id];

  if (!recipe) {
    return <Typography variant="h5">Recipe not found</Typography>;
  }

  return (
    <>
    <Header/>
    <Box sx={{ flexGrow: 1, mt:"100px"}}>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Item>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 'bold', color: '#000' }}
            >
              {recipe.title}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 10,
                justifyContent: 'center',
                fontWeight: 'bold',
                color: '#000',
              }}
            >
              <Typography variant="body2" gutterBottom>
                Submitted by {recipe.submittedBy}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Updated on {recipe.updatedOn}
              </Typography>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Item>
                  <img
                    src={dishimg}
                    alt={recipe.title}
                    style={{ width: '100%', height: 400 }}
                  />
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  <img
                    src={dishimg}
                    alt={recipe.title}
                    style={{ width: '100%', height: 400 }}
                  />
                </Item>
              </Grid>
              <Grid sx={{ m: 'auto' }} item xs={6}>
                <Item>
                  <img
                    src={dishimg}
                    alt={recipe.title}
                    style={{ width: '100%', height: 400 }}
                  />
                </Item>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Grid container spacing={2}>
              <Grid item sx={{ backgroundColor: '#ffbe74' }} xs={6}>
                <Item sx={{ height: 405 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 5,
                      justifyContent: 'space-around',
                      fontWeight: 'bold',
                      color: '#000',
                    }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Prep Time
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {recipe.prepTime}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Cooks Time
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {recipe.cooksTime}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Additional Time
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {recipe.additionalTime}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 10,
                      justifyContent: 'space-around',
                      fontWeight: 'bold',
                      color: '#000',
                    }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Total time
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {recipe.totalTime}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Servings
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {recipe.servings}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Process materials
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        10 mins
                      </Typography>
                    </Box>
                  </Box>
                </Item>
              </Grid>
              <Grid item sx={{ backgroundColor: '#ffbe74' }} xs={6}>
                <Item sx={{ fontWeight: 'bold', color: '#000' }}>
                  <Typography variant="h5" gutterBottom>
                    Ingredients
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    {recipe.ingredients.map((ingredient, index) => (
                      <Typography key={index} variant="body2" gutterBottom>
                        {`• ${ingredient}`}
                      </Typography>
                    ))}
                  </Box>
                </Item>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Item sx={{ height: 405, fontWeight: 'bold', color: '#000' }}>
                  <Typography variant="h5" gutterBottom>
                    Directions
                  </Typography>
                  <Box sx={{ textAlign: 'left' }}>
                    {recipe.steps.map((step, index) => (
                      <div key={index}>
                        <Typography variant="body2" gutterBottom>
                          {`Step ${index + 1}`}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {step}
                        </Typography>
                      </div>
                    ))}
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  <img
                    src={dishimg}
                    alt={recipe.title}
                    style={{ width: '100%', height: 400 }}
                  />
                </Item>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}
