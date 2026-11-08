# Gew — Portfolio

เว็บพอร์ตโฟลิโอแบบ static สำหรับ GitHub Pages ออกแบบให้แก้ข้อมูลภายหลังได้โดยไม่ต้องแก้โค้ดหน้าเว็บ

## แก้ข้อมูลหรือเพิ่มทักษะ

เปิด `data/portfolio.json` แล้วแก้ค่าในไฟล์ เช่น ชื่อ แนะนำตัว อีเมล ทักษะ ผลงาน และลิงก์โซเชียล

เพิ่มทักษะโดยเพิ่มรายการใน `skills`:

```json
{"name":"ชื่อหมวด","description":"อธิบายสั้น ๆ","tags":["เครื่องมือ 1","ทักษะ 2"]}
```

เพิ่มช่องทางติดต่อใน `socials`:

```json
{"label":"ชื่อที่แสดง","url":"https://example.com"}
```

เพิ่มผลงานใน `projects`:

```json
{"name":"ชื่อผลงาน","description":"อธิบายสั้น ๆ","type":"PROJECT TYPE","tags":["เครื่องมือ","ทักษะ"]}
```

บันทึกและ push การเปลี่ยนแปลงขึ้น GitHub แล้ว GitHub Pages จะเผยแพร่เวอร์ชันใหม่ให้อัตโนมัติ เมื่อเปิด Pages สำหรับ branch ที่ใช้

## เผยแพร่แบบ `/portfolio/`

1. สร้าง public repository ชื่อ `portfolio` ในบัญชี `KiwiStarVI`.
2. อัปโหลดไฟล์ในโฟลเดอร์นี้ไว้ที่ root ของ repository.
3. ไปที่ **Settings → Pages** แล้วเลือก **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. เว็บจะอยู่ที่ `https://kiwistarvi.github.io/Portfolio/`.

ถ้าต้องการให้ผมช่วยแก้หรือเพิ่มเนื้อหาในอนาคต ส่งข้อมูลใหม่มาในแชตนี้ได้ และแก้เองได้โดยแก้ `data/portfolio.json` ใน GitHub.
