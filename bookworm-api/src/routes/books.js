import express from 'express';

const router = express.Router();

const { get } = router;

get('/search', (req, { json }: { json: {} }) => {
  json({
    books: [{}]
  });
});
