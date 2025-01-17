const express = require("express");
const {
  calculateCartTotal,
  calculateDiscount,
} = require("../utils/cartHelper");

const router = express.Router();

let cart = [];
// Ajouter un produit au panier
router.post("/", (req, res) => {
  const { id, name, price, taxRate, quantity } = req.body;

  if (!id || !name || !price || !taxRate || !quantity) {
    return res.status(400).json({ error: "Champs requis manquants" });
  }

  const existingProduct = cart.find((product) => product.id === id);
  if (existingProduct) {
    return res
      .status(400)
      .json({ error: "Produit déjà présent dans le panier" });
  }

  cart.push({ id, name, price, taxRate, quantity });
  res.status(201).json({ message: "Produit ajouté au panier", cart });
});

// Récupérer les détails du panier
router.get("/", (req, res) => {
  const totals = calculateCartTotal(cart);
  res.json({ cart, ...totals });
});

// Supprimer un produit
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = cart.length;

  cart = cart.filter((product) => product.id !== id);

  if (cart.length === initialLength) {
    return res.status(404).json({ error: "Produit non trouvé" });
  }

  res.json({ message: "Produit supprimé du panier", cart });
});

module.exports = router;
