const message = [
  "ไม่เป็นไรนะ วันนี้อาจจะเหนื่อย แต่พรุ่งนี้ยังมีโอกาสให้เริ่มใหม่เสมอ 🌅💖",
  "ไม่ว่าคุณจะรู้สึกยังไง ผมพร้อมอยู่ข้าง ๆ เสมอ 🤗 คุณไม่ได้เดินลำพังนะ 🚶‍♀️❤️",
  "ถ้าโลกภายนอกวุ่นวาย ลองพักใจในตัวอักษรนี้ก่อน ✨ แล้วค่อยลุกขึ้นสู้อีกครั้ง 💪",
  "ทุกความรู้สึกของคุณมีคุณค่า 💌 ไม่ต้องกลัวที่จะรู้สึก ไม่ต้องฝืนที่จะเข้มแข็งเสมอไป 🌈",
  "ถ้าเหนื่อยมาก ลองพักก่อนสักนิด 😴 ไม่ต้องรีบไปไหน เพราะเส้นทางนี้เป็นของคุณเอง 🚀",
  "ไม่ต้องเก่งที่สุด 🏅 แค่เป็นตัวเองในแบบที่สบายใจก็พอแล้วนะ 🌻",
  "ถ้าวันนี้มันหนัก ลองปล่อยความคิดลงในบันทึก 📓 แล้วให้ตัวเองได้พักใจสักครู่ 🌙",
  "คุณไม่ได้อ่อนแอที่รู้สึกเหนื่อย 😔 แค่คุณเป็นมนุษย์คนหนึ่งที่ต้องการการพักผ่อน 🛌",
  "แม้ในวันที่หมอกหนาจะปกคลุมท้องฟ้า 🌫️ แต่พระอาทิตย์ยังรอที่จะส่องแสงเสมอ 🌞",
  "ไม่ว่าคุณจะเจออะไรมา วันนี้คุณทำดีที่สุดแล้ว 🎉 แค่หายใจและอยู่ตรงนี้ก็ดีมากพอ 🍃"
];

const userHighlight = [];

const loadHighlight = JSON.parse(localStorage.getItem("highlights"));
if (loadHighlight){
  for (const key in loadHighlight){
    // console.log(key+loadHighlight[key][0]);
    loadHighlight[key].forEach(message => {
      // console.log(key+":"+message);
      userHighlight.push(`📌${message} 📆${key[5]+key[6]+"/"+key[8]+key[9]+"/"+key[2]+key[3]}`);
    });
  }
  // console.log(userHighlight);
}else{
  userHighlight = message;
}


const changeTextRandomly = (messageList) => {
    const elements = document.querySelectorAll('.text-noti');
    elements.forEach(element => {
        const randomIndex = Math.floor(Math.random() * messageList.length);
        element.textContent = messageList[randomIndex];
    });
};

changeTextRandomly(userHighlight);

