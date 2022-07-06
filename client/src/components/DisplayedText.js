
export default function DisplayedText({settings, toggle, displayText, convertedText}) {
    
    return(
        <div   
          className={"w-5/6 h-screen m-auto overflow-scroll"}
          style={{
            backgroundColor: `${settings.background_color}`,
            color: `${settings.font_color}`,
            fontSize: `${settings.font_size}px`,
            lineHeight: `${settings.line_spacing}`,
            padding: "0 .5rem",
            textAlign: "justify"
          }}>
            <div>
                {toggle ? displayText : convertedText}
            </div>
        </div>
    )
}