import { Router } from 'express';
const router = Router();

import pool from '../database';
import { isLogged } from '../lib/auth';

router.get('/add', isLogged, (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link saved successfully')
    res.redirect('/links');
});

router.get('/', isLogged, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/lists', { links });
})

router.get('/delete/:id', isLogged, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link deleted successfully');
    res.redirect('/links');
})

router.get('/edit/:id', isLogged, async (req, res) => {
    const { id } = req.params;
    const link = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', { link: link[0] });
})

router.post('/edit/:id', isLogged, async (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const newLink = { title, url, description };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link updated successfully');
    res.redirect('/links');
})

export default router;