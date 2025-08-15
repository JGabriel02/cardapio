import React from "react";

// 🔢 Configure o número do WhatsApp (somente dígitos, com DDI/DDD)
const WHATSAPP_NUMBER = "5551994715897"; // ← troque aqui
const WHATSAPP_MSG = encodeURIComponent("Olá, gostaria de fazer um pedido!"); // Mensagem padrão

// 🧾 Dados do cardápio (extraídos do PDF do usuário)
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
        name: "Firenze Burger",
        description:
          "Burger (140g), queijo provolone, chimichurri, tomate seco e molho da casa.",
        price: 42.9,
      },
      {
        name: "Mr. Chicken Burger",
        description:
          "Burger de frango, cream cheese, alface, tomate, queijo e molho da casa.",
        price: 32.9,
      },
      {
        name: "Fit Burger",
        description: "Burger (140g), requeijão, alface, tomate, queijo.",
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

function Currency({ value }: { value: number }) {
  return <span>{value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>;
}

function Header() {
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;
  return (
    <header className="sticky top-0 z-10 bg-black/90 backdrop-blur text-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.jpg" alt="Mr George Hamburgueria" className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20" />
          <div className="leading-tight">
            <h1 className="text-xl font-extrabold tracking-wide">MR GEORGE</h1>
            <p className="text-xs text-white/70">Hamburgueria • Fast Food</p>
          </div>
        </div>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold bg-green-500 hover:bg-green-600 active:scale-[.98] transition"
        >
          Fazer pedido no WhatsApp
        </a>
      </div>
    </header>
  );
}

function Banner() {
  return (
    <div className="bg-amber-100 border-y border-amber-200">
      <div className="mx-auto max-w-6xl px-4 py-4 text-center text-amber-900 font-medium">
        Todos os pedidos acompanham <strong>200g de batatas</strong> 🍟
      </div>
    </div>
  );
}

function ItemCard({ item, category }: { item: { name: string; description: string; price: number }; category: string }) {
  // Escolha a imagem genérica com base na categoria
  const categoryImage =
    category === "Hambúrgueres"
      ? "/assets/burger.jpeg"
      : category === "Cachorros-quentes"
      ? "/assets/dog.jpeg"
      : "/assets/box.jpeg";

  return (
    <div className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <img
        src={categoryImage}
        alt={`Imagem ilustrativa da categoria ${category}`}
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

function Section({ category, items }: { category: string; items: { name: string; description: string; price: number }[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <h2 className="mt-8 mb-4 text-2xl font-extrabold tracking-tight">{category}</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, idx) => (
          <ItemCard key={`${category}-${idx}`} item={it} category={category} />
        ))}
      </div>
    </section>
  );
}

export default function MenuPage() {
  return (
    <main className="min-h-dvh bg-zinc-50 text-zinc-900">
      <Header />
      <Banner />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-2">
        <div className="rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-700 p-6 text-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Cardápio</h2>
          <p className="mt-1 text-white/80 text-sm">
            Selecione seu lanche favorito e finalize pelo WhatsApp. Promoções podem aparecer no atendimento 😉
          </p>
        </div>
      </section>

      {/* Seções */}
      {menu.map((bloc, i) => (
        <Section key={i} category={bloc.category} items={bloc.items} />
      ))}

      {/* Rodapé */}
      <footer className="mt-10 border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-zinc-600 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Mr George Hamburgueria</p>
          <p className="text-zinc-500">Todos os preços em reais (BRL). Imagens ilustrativas.</p>
        </div>
      </footer>
    </main>
  );
}