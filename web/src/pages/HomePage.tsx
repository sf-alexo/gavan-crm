import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api, setToken } from '../api';

type Me = { id: string; email: string; name: string; role: string };

export function HomePage() {
  const navigate = useNavigate();
  const me = useQuery({
    queryKey: ['me'],
    queryFn: () => api<Me>('/auth/me'),
  });

  function logout() {
    setToken(null);
    navigate('/login');
  }

  return (
    <div className="shell">
      <aside className="nav">
        <h2>Гавань</h2>
        <button type="button" onClick={logout}>
          Выйти
        </button>
      </aside>
      <main className="main">
        <h1>CRM barebone</h1>
        {me.isLoading && <p>Загрузка…</p>}
        {me.isError && <p className="error">Не удалось загрузить профиль</p>}
        {me.data && (
          <p>
            Вы вошли как <strong>{me.data.name}</strong> ({me.data.role}) — {me.data.email}
          </p>
        )}
        <p>Дальше: экраны из mockups (клиенты, сделки, заказы, клинер).</p>
      </main>
    </div>
  );
}
