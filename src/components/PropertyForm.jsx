import { useState } from 'react'
import './PropertyForm.css'

// 物件の新規登録・編集で共用するフォーム（モーダル表示）
export default function PropertyForm({ mode, initialValues, onSubmit, onCancel }) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [rent, setRent] = useState(initialValues?.rent ?? '')
  const [area, setArea] = useState(initialValues?.area ?? '')
  const [layout, setLayout] = useState(initialValues?.layout ?? '')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const result = await onSubmit({
      name,
      rent: Number(rent),
      area,
      layout,
    })

    setSaving(false)

    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <div className="property-form-overlay">
      <div className="property-form-card">
        <h2>{mode === 'edit' ? '物件を編集' : '物件を新規登録'}</h2>
        <form className="property-form" onSubmit={handleSubmit}>
          <label>
            物件名
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            家賃（円）
            <input
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              required
              min={0}
            />
          </label>
          <label>
            エリア
            <input type="text" value={area} onChange={(e) => setArea(e.target.value)} required />
          </label>
          <label>
            間取り
            <input
              type="text"
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
              required
              placeholder="例：1LDK"
            />
          </label>
          {error && <p className="property-form-error">{error}</p>}
          <div className="property-form-actions">
            <button type="button" onClick={onCancel} disabled={saving}>
              キャンセル
            </button>
            <button type="submit" className="primary-button" disabled={saving}>
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
