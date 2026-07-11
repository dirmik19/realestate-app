import { useAuth } from '../contexts/AuthContext'
import './Properties.css'

// 物件のダミーデータ
const dummyProperties = [
  { id: 1, name: 'サンシャインコート101', rent: '85,000円', area: '東京都渋谷区' },
  { id: 2, name: 'グリーンヒルズ202', rent: '120,000円', area: '東京都世田谷区' },
  { id: 3, name: 'パークサイド303', rent: '98,000円', area: '神奈川県横浜市' },
  { id: 4, name: 'リバーサイドレジデンス404', rent: '150,000円', area: '東京都江東区' },
  { id: 5, name: 'メゾン・ド・フルール505', rent: '76,000円', area: '埼玉県さいたま市' },
  { id: 6, name: 'ヒルトップコート606', rent: '110,000円', area: '千葉県千葉市' },
]

// 物件一覧画面
export default function Properties() {
  const { user, signOut } = useAuth()

  return (
    <div className="properties-page">
      <header className="properties-header">
        <h1>物件一覧</h1>
        <div className="properties-header-right">
          <span className="properties-user-email">{user?.email}</span>
          <button type="button" onClick={() => signOut()}>
            ログアウト
          </button>
        </div>
      </header>

      <div className="properties-grid">
        {dummyProperties.map((property) => (
          <div className="property-card" key={property.id}>
            <h2 className="property-name">{property.name}</h2>
            <p className="property-rent">家賃：{property.rent}</p>
            <p className="property-area">エリア：{property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
