npx create-react-app : Tạo dự án React

I.	Cấu trúc Files:
front-end/
  ├── public/
  ├── src/
  │   ├── assets/
  │   ├── components/
  │   ├── containers/
  │   ├── api/
  │   ├── views/
  │   ├── styles/
  │   ├── utils/
  │   ├── App.js
  │   ├── index.js
  └── package.json

- public/
Chứa các file tĩnh như HTML, hình ảnh, favicon.
- src/
+ assets/
Chứa các tài sản tĩnh như hình ảnh, fonts, v.v.
+ components/
Chứa các component React.
=> Đặt tên theo mô hình: ComponentName.js và thư mục con nếu cần thiết (e.g., Button/, Header/).
+ containers/
Chứa các container component, thường kết nối với Redux hoặc Context API.
+ api/
Chứa các file tương tác với API.
=> Đặt tên theo mô hình: serviceName.js (e.g., userService.js).
+ views/
Chứa các trang chính của ứng dụng.
=> Đặt tên theo mô hình: PageName.js (e.g., HomePage.js, LoginPage.js).
+ styles/
Chứa các file CSS hoặc SCSS.
=> Đặt tên theo mô hình: tênComponent.module.css hoặc tênComponent.module.scss.
+ utils/
Chứa các hàm tiện ích, tương tự như backend.
+ App.js và index.js
App.js: component gốc của ứng dụng.
index.js: file khởi tạo và render ứng dụng React.
+ setupTests.js
Chứa cấu hình cho việc test.

======> Chạy front-end: npm run start

---------------------------------------------------

II.	Quy tắc đặt tên
File và thư mục: Tên file và thư mục nên sử dụng camelCase hoặc PascalCase tuỳ theo loại file. Tránh sử dụng dấu cách hoặc ký tự đặc biệt. Riêng tên project React theo quy tắc “project-name”
Component: Sử dụng PascalCase (e.g., MyComponent.js).
Hook: Sử dụng camelCase với tiền tố use (e.g., useAuth.js).
Branch cho common component: component_***_ten