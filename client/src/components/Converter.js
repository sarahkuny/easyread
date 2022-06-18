//Header - go to documents, sign out button
//Document upload form
//Settings
//Converted Text
//Save Document Form
//Help button with popup
import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';
import Header from './Header';


export default function Converter(){
    const [fontSize, setFontSize] = useState(14);
    const [fontColor, setFontColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#FFFDD0");
    const [fixation, setFixation] = useState(1);
    const [saccade, setSaccade] = useState(10);
    const [lineSpacing, setLineSpacing] = useState(1.5)

    return(
        <>
            <Header buttonOne="My Documents" buttonTwo="Sign Out" linkOne="/documents" linkTwo="/" />
            <div className="w-5/6 h-full bg-slate-50 m-auto shadow-2xl">
               
               {/* upload form */}
                <form className="bg-white w-full flex justify-evenly py-2 border">
                    <label className="w-1/6 py-2">Attach Document</label>
                    <input className="w-3/6 border rounded-md border-black"></input>
                    <button className="bg-black rounded-md text-white px-4 py-2">Convert</button>
                </form>

                {/* Settings */}
                <div className="w-full h-12 flex bg-black rounded-md justify-evenly items-center px-2">
                    <h4 className="font-bold text-1xl text-white">Settings</h4>
                    <div>
                        <label className="m-2 text-white">Font Color</label>
                        <input 
                            className="w-10 outline-none border-transparent text-black"
                            value={fontColor}
                            type="color"
                        />
                    </div>
                    <div className="">
                        <label className="m-2 text-white">Background Color</label>
                        <input 
                            className="w-10"
                            value={bgColor}
                            type="color" 
                        />
                    </div>
                    <div>
                        <label className="m-2 text-white">Font Size</label>
                        <input 
                            className="w-10"
                            value={fontSize}
                            min="1"
                            type="number"
                            />
                    </div>
                    <div>
                        <label className="m-2 text-white">Line Spacing</label>
                        <input 
                            className="w-10"
                            value={lineSpacing}
                            min="1"
                            type="number"
                            />
                    </div>
                    <div>
                        <label className="m-2 text-white">Fixation</label>
                        <input 
                            className="w-10"
                            value={fixation}
                            type="number"
                        />
                    </div>
                    <div>
                        <label className="m-2 text-white">Saccade</label>
                        <input 
                            className="w-10"
                            value={saccade}
                            type="number"
                        />
                    </div>
                </div>

                {/* converted text */}
                <div className="w-5/6 h-screen m-auto bg-yellow-50 overflow-scroll">
                    <h1 className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ullamcorper rutrum felis, non lacinia dolor finibus vitae. Integer dictum a nunc ut imperdiet. Proin commodo luctus faucibus. Nullam non dui id ipsum sollicitudin mollis a at ante. Quisque sem libero, scelerisque quis semper at, eleifend eu sapien. In hac habitasse platea dictumst. Morbi ut libero id ante auctor consectetur. Duis sed nisi ultricies, fermentum erat et, maximus dui. Vestibulum lorem justo, fringilla porttitor sodales id, luctus sed magna. Maecenas sodales semper justo id laoreet. Nunc bibendum eu mauris volutpat pulvinar. Aliquam lectus justo, posuere id nunc a, semper faucibus eros. Sed pharetra nisl dolor, faucibus sodales augue pellentesque ac. Nulla a erat dapibus, auctor enim in, rutrum tellus. Phasellus sodales elit lectus, a iaculis metus placerat ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Maecenas mattis dignissim mauris, et auctor nisi ullamcorper id. Mauris vitae congue nibh. Maecenas imperdiet, leo in dapibus sollicitudin, quam velit eleifend libero, vel efficitur odio dolor tincidunt odio. Ut at blandit lectus. Duis in luctus ex. Nam posuere libero imperdiet diam vestibulum pellentesque. Aliquam ornare pellentesque metus, vitae facilisis erat facilisis commodo. Vestibulum sed pretium magna. Donec vel velit ac libero interdum elementum ut eu erat. Duis eget urna id quam egestas rhoncus. Nam non pretium magna, vel eleifend tellus. Proin quis fringilla urna, a vulputate dui. Praesent nec lectus eget diam fringilla aliquam sed in felis. Etiam sed sollicitudin urna.

Proin dignissim quam elit, ac tincidunt tellus convallis auctor. Etiam ac nunc et erat ultrices hendrerit non eget orci. Mauris porttitor ac odio et rutrum. Donec congue tellus vel aliquam suscipit. Vivamus gravida leo leo, sit amet efficitur mauris cursus pulvinar. Nam sit amet leo sed lectus scelerisque congue eu sit amet libero. Morbi tincidunt posuere neque ut porta. Nam varius commodo massa vel pretium. Quisque egestas at eros vitae blandit. Nam at posuere mauris. Maecenas enim diam, semper at gravida non, fermentum ornare nisi. Fusce eget semper lorem.

Quisque volutpat sodales mi at condimentum. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla sodales, leo eget euismod pharetra, nunc dolor egestas metus, et viverra massa arcu eget nisi. Pellentesque at faucibus nisi. Integer porta viverra porta. Nullam vitae aliquam lectus. Suspendisse dignissim lacus et augue finibus luctus. Mauris et fringilla eros. Etiam porttitor varius nisi a dignissim. Vivamus ultricies felis sed ante efficitur, ut ultrices dui malesuada.

Sed a pretium nunc. Curabitur dolor neque, ultricies et convallis venenatis, rhoncus vel ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis ex diam, vestibulum in augue sit amet, mollis dictum sem. Nunc fermentum facilisis luctus. Fusce et magna orci. Cras congue dui eros. Proin ullamcorper mauris eu sapien tincidunt, a porta ante semper. Cras in nunc vitae lectus sagittis vulputate. Quisque rutrum ante vel risus pellentesque, ut tempor felis cursus. Nunc imperdiet elementum velit ut facilisis. Morbi auctor justo auctor ante porta euismod. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas orci libero, viverra in lorem in, vestibulum dignissim sapien. Proin pretium arcu sit amet velit vestibulum, vitae porta magna hendrerit. Fusce dignissim efficitur dictum.

Duis vulputate nisi non felis semper imperdiet. Donec porttitor rhoncus nulla a rhoncus. Etiam fringilla, lacus vel scelerisque consequat, lorem augue fermentum tortor, in posuere magna urna venenatis metus. Quisque vel lorem blandit, tincidunt est mattis, hendrerit nulla. Phasellus mollis, mauris vel consequat imperdiet, ex nisl consequat massa, eget aliquet nisi dolor ac nisl. Nullam nibh tellus, ultrices nec nunc non, convallis sagittis nunc. Mauris ornare ultrices lacus eget cursus.

Nullam eleifend vulputate orci eu vehicula. Suspendisse ut risus quis eros congue finibus. Sed et dui vel elit rutrum vulputate a nec elit. Fusce aliquet urna quam, eu rhoncus odio consequat at. Aliquam ex sem, lacinia eu enim et, dictum tempus turpis. Proin tristique luctus metus in ultricies. Suspendisse et justo tincidunt nisl pretium pulvinar sed eu tellus. Donec vitae sapien nec purus tincidunt commodo at vel enim. Aliquam interdum suscipit lectus, vitae ullamcorper urna euismod a. Sed et ligula urna. Nunc purus justo, lacinia et semper sed, condimentum ac dolor. Donec hendrerit posuere dolor at rhoncus.

Etiam at orci diam. Donec sed efficitur mauris. Vestibulum luctus diam et justo eleifend dapibus. Integer id orci fringilla, condimentum tortor sed, efficitur magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus metus massa, sollicitudin nec accumsan et, fermentum malesuada lacus. Curabitur eu euismod velit. Nunc ac eros auctor, volutpat erat ut, viverra diam. In volutpat varius urna, at tincidunt magna ultricies eu. Cras nec orci a nunc congue bibendum nec non purus. Donec at est nec augue bibendum accumsan nec ultricies sapien. Sed sed vulputate mi, vitae porttitor urna. In hac habitasse platea dictumst. Aliquam sed tortor neque. Nunc gravida sem quam, sed fermentum eros mollis ac. Aenean scelerisque magna ut suscipit tempus.

Donec erat odio, semper et porttitor venenatis, bibendum rutrum sem. Nunc aliquam volutpat porttitor. Maecenas iaculis dictum ante. Integer tempor turpis ut nisl feugiat mollis. Ut congue lacinia mi dictum rutrum. Etiam at lacus in felis suscipit dictum. Ut et nibh nisi. Pellentesque ut est est. Maecenas lorem eros, imperdiet ut consequat non, porta et mi. Suspendisse eget aliquam elit. Nullam at consectetur odio, vitae porttitor tellus.

Suspendisse maximus nec felis sed sagittis. Cras sed mi tellus. Nullam lectus libero, sollicitudin non sollicitudin elementum, rutrum et risus. Aliquam ut porttitor ipsum. Vestibulum vulputate dui quam, quis ullamcorper arcu fringilla id. Maecenas et ligula ullamcorper urna vehicula scelerisque aliquam id tellus. Pellentesque lacus arcu, cursus in augue et, feugiat fringilla odio. Cras nec erat quis neque eleifend vulputate. Vestibulum sed sem ac sem venenatis ullamcorper sed id ante. Mauris tincidunt sapien at ante ullamcorper feugiat. Integer sit amet vulputate justo.</h1>
                </div>

                <details>
                    <summary>Need help?</summary>
                    <p>Upload a .txt file to load text into the converter. You can adjust your 
                        text settings using the settings bar found just above the text.
                    </p>
                </details>
            </div>
           
        </>
    )
}