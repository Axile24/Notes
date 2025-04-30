function validateNoteParams(req, res, next) {
    const { title, text } = req.body;
    
    if (!title || !text) {
        return res.status(400).json({
            success: false,
            message: 'Title and text are required'
        });
    }

    if (typeof title !== 'string' || typeof text !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'Title and text must be strings'
        });
    }

    if (title.trim().length === 0 || text.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Title and text cannot be empty'
        });
    }

    next();
}

module.exports = { validateNoteParams };
