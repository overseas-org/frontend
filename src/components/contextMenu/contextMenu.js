import './contextMenu.css'


export const ContextMenu = ({ menuPosition, options }) => {
    console.log(options)
  return (
        <div className="context-menu" style={{
                top: `${menuPosition.y}px`,
                left: `${menuPosition.x}px`
                }}>
            {
                options.map((option)=>{
                    return <button onClick={option.onClick}>{option.name}</button>
                })
            }
        </div>
  )
}