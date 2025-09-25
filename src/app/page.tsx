"use client"; // Diretiva para marcar o arquivo como Client Component

import React, { useState } from "react";

const WHATSAPP_NUMBER = "555181444557"; // Número do WhatsApp
const WHATSAPP_MSG = encodeURIComponent("Olá, gostaria de fazer um pedido!"); // Mensagem padrão

// 🧾 Dados do cardápio
const menu = [
  {
    category: "Hambúrgueres",
    items: [
      {
        name: "Burguer Supremo",
        description:
          "Pão de brioche, 3 blends de carne (80g cada), maionese, queijo provolone, molho cheddar, bacon picado.",
        price: 45.0,
      },
      {
        name: "Mr. George",
        description:
          "Burger (140g), queijo cheddar, tomate, alface americana e molho da casa.",
        price: 32.9,
      },
      {
        name: "Big George",
        description:
          "Dois burgers (140g), bacon, cheddar, cebola caramelizada e molho da casa.",
        price: 49.9,
      },
      {
        name: "Churraking",
        description:
          "Pão de brioche, molho da casa, burger (140g), queijo muçarela, bacon, onion rings, queijo coalho.",
        price: 49.9,
      },
      {
        name: "Mr. Chicken Burger",
        description:
          "Burger de frango, cream cheese, alface, tomate, queijo e molho da casa.",
        price: 32.9,
      },
      {
        name: "Mr. Joanes",
        description:
          "Burger (140g), cebola caramelizada, cebola roxa, molho de cheddar, bacon, rúcula, barbecue e molho da casa.",
        price: 37.9,
      },
    ],
  },
  {
    category: "Cachorros-quentes",
    items: [
      {
        name: "Nº I",
        description:
          "Pão, 2 salsichas, maionese, molho, ervilha, milho, batata palha, cebola roxa, tomate, queijo ralado, tempero verde, ketchup e mostarda.",
        price: 17.9,
      },
      {
        name: "Nº II",
        description:
          "Pão, 3 salsichas, maionese, molho, ervilha, milho, batata palha, cebola roxa, tomate, queijo ralado, tempero verde, ketchup e mostarda.",
        price: 21.9,
      },
      {
        name: "Nº III",
        description:
          "Pão, 1 linguiça, maionese, molho, ervilha, milho, batata palha, cebola roxa, tomate, queijo ralado, tempero verde, ketchup e mostarda.",
        price: 22.9,
      },
      {
        name: "Nº IV",
        description:
          "Pão, 2 linguiças, maionese, molho, ervilha, milho, batata palha, cebola roxa, tomate, queijo ralado, tempero verde, ketchup e mostarda.",
        price: 27.9,
      },
      {
        name: "Nº V",
        description:
          "Pão, 3 linguiças, maionese, molho, ervilha, milho, batata palha, cebola roxa, tomate, queijo ralado, tempero verde, ketchup e mostarda.",
        price: 33.9,
      },
    ],
  },
  {
    category: "Boxes",
    items: [
      {
        name: "Box Solteiro",
        description:
          "1 hambúrguer clássico, anéis de cebola, batata e nosso molho da casa de 50ml.",
        price: 39.9,
      },
      {
        name: "Box Casal",
        description:
          "2 hambúrgueres, anéis de cebola, batata e nosso molho da casa de 100ml, uma barra de chocolate.",
        price: 69.9,
      },
      {
        name: "Box Família",
        description:
          "3 hambúrgueres, anéis de cebola, batata e nosso molho da casa de 100ml, 1 refrigerante de 2L.",
        price: 109.9,
      },
      {
        name: "Box Super Família",
        description:
          "4 hambúrgueres, anéis de cebola, batata frita, nosso molho da casa de 200ml e 1 refrigerante de 3L.",
        price: 124.9,
      },
    ],
  },
];

// Componente para formatar valores monetários
function Currency({ value }: { value: number }) {
  return <span>{value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>;
}

// Componente de cabeçalho
function Header({ wa }: { wa: string }) {
  return (
    <header className="sticky top-0 z-10 bg-black/90 backdrop-blur text-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.jpg" alt="Mr George Hamburgueria" className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20" />
          <div className="leading-tight hidden sm:block">
            <h1 className="text-xl font-extrabold tracking-wide">MR GEORGE</h1>
            <p className="text-xs text-white/70">Hamburgueria • Fast Food</p>
          </div>
        </div>
        <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold bg-green-500 hover:bg-green-600 active:scale-[.98] transition">
          Finalizar pedido no WhatsApp
        </a>
      </div>
    </header>
  );
}

// Banner informativo
function Banner() {
  return (
    <div className="bg-amber-100 border-y border-amber-200">
      <div className="mx-auto max-w-6xl px-4 py-4 text-center text-amber-900 font-medium">
        Todos os hambúrgueres acompanham <strong>200g de batatas</strong> 🍟
      </div>
    </div>
  );
}

// Card para exibir cada item do cardápio
function ItemCard({
  item,
  category,
  onSelectItem,
  isSelected,
}: {
  item: { name: string; description: string; price: number };
  category: string;
  onSelectItem: (item: { name: string; price: number }) => void;
  isSelected: boolean;
}) {
  const itemImages: { [key: string]: string } = {
    "Burguer Supremo": "/assets/burger_supremo.jpg",
    "Mr. George": "/assets/mr_george.jpg",
    "Big George": "/assets/big_george.jpg",
    "Churraking": "/assets/churraking.jpg",
    "Mr. Chicken Burger": "/assets/mr_chicken.jpg",
    "Mr. Joanes": "/assets/burger.jpeg",
  };

  const categoryImage =
    itemImages[item.name] ||
    (category === "Cachorros-quentes"
      ? "/assets/dog.jpg"
      : category === "Boxes"
      ? "/assets/box.jpeg"
      : "/assets/default.jpg");

  return (
    <div
      onClick={() => onSelectItem({ name: item.name, price: item.price })}
      className={`flex flex-col sm:flex-row gap-4 rounded-2xl border p-4 shadow-sm transition-shadow cursor-pointer ${
        isSelected ? "border-green-500 bg-green-50" : "border-zinc-200 bg-white hover:shadow-md"
      }`}
    >
      <img
        src={categoryImage}
        alt={`Imagem do item ${item.name}`}
        className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl object-cover"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-zinc-900">{item.name}</h3>
          <div className="shrink-0 rounded-full bg-zinc-900 px-3 py-1 text-sm font-semibold text-white">
            <Currency value={item.price} />
          </div>
        </div>
        <p className="mt-1 text-sm text-zinc-600">{item.description}</p>
      </div>
    </div>
  );
}

// Seção para exibir categorias e itens
function Section({
  category,
  items,
  onSelectItem,
  selectedItems,
}: {
  category: string;
  items: { name: string; description: string; price: number }[];
  onSelectItem: (item: { name: string; price: number }) => void;
  selectedItems: { name: string; price: number }[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <h2 className="mt-8 mb-4 text-2xl font-extrabold tracking-tight">{category}</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, idx) => (
          <ItemCard
            key={`${category}-${idx}`}
            item={it}
            category={category}
            onSelectItem={onSelectItem}
            isSelected={selectedItems.some((selected) => selected.name === it.name)}
          />
        ))}
      </div>
    </section>
  );
}

// Página principal
export default function MenuPage() {
  const [selectedItems, setSelectedItems] = useState<{ name: string; price: number }[]>([]);

  const handleSelectItem = (item: { name: string; price: number }) => {
    setSelectedItems((prev) => {
      const isAlreadySelected = prev.find((i) => i.name === item.name);
      if (isAlreadySelected) {
        return prev.filter((i) => i.name !== item.name);
      }
      return [...prev, item];
    });
  };

  const generateWhatsAppMessage = () => {
    if (selectedItems.length === 0) {
      return WHATSAPP_MSG;
    }
    const itemsMessage = selectedItems
      .map((item) => `- ${item.name} (${item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })})`)
      .join("\n");
    return encodeURIComponent(`Olá, gostaria de fazer um pedido com os seguintes itens:\n${itemsMessage}`);
  };

  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${generateWhatsAppMessage()}`;

  return (
    <main className="min-h-dvh bg-zinc-50 text-zinc-900">
      <Header wa={wa} />
      <Banner />
      {menu.map((bloc, i) => (
        <Section
          key={i}
          category={bloc.category}
          items={bloc.items}
          onSelectItem={handleSelectItem}
          selectedItems={selectedItems}
        />
      ))}
    </main>
  );
}