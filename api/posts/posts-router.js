// posts için gerekli routerları buraya yazın
const router = require("express").Router();
const postsModel = require("./posts-model");

router.get("/", async (req, res) => {
    try {
        const all = await postsModel.find();
        res.json(all)
    } catch (error) {
        res.status(500).json({ message: "Gönderiler alınamadı" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const post = await postsModel.findById(req.params.id);
        if (post) {
            res.json(post)
        } else {
            res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" })
        }
    } catch (error) {
        res.status(500).json({ message: "Gönderiler alınamadı" })
    }
})

router.post("/", async (req, res) => {
    try {
        const {title, contents} = req.body;
        if (!title || !contents) {
            res.status(400).json({ message: "Lütfen gönderi için bir title ve contents sağlayın" })
        } else {
            const insertedId = await postsModel.insert({title: title, contents: contents});
            const insertedPost = await postsModel.findById(insertedId.id)
            res.status(201).json(insertedPost);
        }
    } catch (error) {
        res.status(500).json({ message: "Veritabanına kaydedilirken bir hata oluştu" })
    }
})

router.put("/:id", async (req, res) => {
    const post = await postsModel.findById(req.params.id);
    const {title, contents} = req.body;
    try {
        if (!post) {
            res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" })
        } else if (!title || !contents) {
            res.status(400).json({ message: "Lütfen gönderi için title ve contents sağlayın" })
        } else {
            await postsModel.update(req.params.id, {title:title, contents: contents});
            const updated = await postsModel.findById(req.params.id)
            res.status(200).json(updated)
        }
    } catch (error) {
        res.status(500).json({ message: "Gönderi bilgileri güncellenemedi" })
    }
})

router.delete("/:id", async (req, res) => {
    const post = await postsModel.findById(req.params.id);
    try {
        if (!post) {
            res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
        } else {
            await postsModel.remove(req.params.id);
            res.json(post);
        }
    } catch (error) {
        res.status(500).json({ message: "Gönderi silinemedi" })
    }
})

router.get("/:id/comments", async(req, res) => {
    const post = await postsModel.findById(req.params.id);

    try {
        if (!post) {
            res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" })
        } else {
            const postComment = await postsModel.findPostComments(req.params.id)
            res.json(postComment)
        }
    } catch (error) {
        res.status(500).json({ message: "Gönderi silinemedi" })
    }

})

module.exports = router;






