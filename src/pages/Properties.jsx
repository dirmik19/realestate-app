import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import PropertyForm from '../components/PropertyForm'
import './Properties.css'

// 物件一覧画面
export default function Properties() {
  const { user, signOut } = useAuth()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // フォームの表示モード（null: 非表示 / 'add': 新規登録 / 'edit': 編集）
  const [formMode, setFormMode] = useState(null)
  const [editingProperty, setEditingProperty] = useState(null)

  // 物件一覧を取得する（RLSにより自分が登録した物件のみ返る）
  const fetchProperties = async () => {
    setLoading(true)
    setError('')

    const { data, error: fetchError } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError('物件の取得に失敗しました。')
    } else {
      setProperties(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const openAddForm = () => {
    setEditingProperty(null)
    setFormMode('add')
  }

  const openEditForm = (property) => {
    setEditingProperty(property)
    setFormMode('edit')
  }

  const closeForm = () => {
    setFormMode(null)
    setEditingProperty(null)
  }

  // 新規登録・更新をまとめて処理する
  const handleSubmit = async (values) => {
    if (formMode === 'edit' && editingProperty) {
      const { error: updateError } = await supabase
        .from('properties')
        .update(values)
        .eq('id', editingProperty.id)

      if (updateError) {
        return { error: '物件の更新に失敗しました。' }
      }
    } else {
      const { error: insertError } = await supabase
        .from('properties')
        .insert({ ...values, user_id: user.id })

      if (insertError) {
        return { error: '物件の登録に失敗しました。' }
      }
    }

    closeForm()
    await fetchProperties()
    return { error: null }
  }

  // 物件を削除する
  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除しますか？')) return

    const { error: deleteError } = await supabase.from('properties').delete().eq('id', id)

    if (deleteError) {
      setError('物件の削除に失敗しました。')
      return
    }

    await fetchProperties()
  }

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

      <div className="properties-toolbar">
        <button type="button" className="primary-button" onClick={openAddForm}>
          ＋ 新規物件を登録
        </button>
      </div>

      {error && <p className="properties-error">{error}</p>}

      {loading ? (
        <p>読み込み中...</p>
      ) : properties.length === 0 ? (
        <p>登録されている物件はありません。</p>
      ) : (
        <div className="properties-grid">
          {properties.map((property) => (
            <div className="property-card" key={property.id}>
              <h2 className="property-name">{property.name}</h2>
              <p className="property-rent">家賃：{property.rent.toLocaleString()}円</p>
              <p className="property-area">エリア：{property.area}</p>
              <p className="property-layout">間取り：{property.layout}</p>
              <div className="property-card-actions">
                <button type="button" onClick={() => openEditForm(property)}>
                  編集
                </button>
                <button type="button" className="danger-button" onClick={() => handleDelete(property.id)}>
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formMode && (
        <PropertyForm
          mode={formMode}
          initialValues={editingProperty}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}
    </div>
  )
}
