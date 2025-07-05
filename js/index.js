// const BASE_URL = 'https://svcy.myclass.vn/api/QuanLyNhanVienApi';

// //GET === LẤY DANH SÁCH NHÂN VIÊN ===

// let getAllNhanVien = async () => {
//     try {
//         const res = await axios({
//             url: `${BASE_URL}/LayDanhSachNhanVien`,
//             method: 'GET',
//         });
//         renderTableNhanVien(res.data);
//     } catch (err) {
//         alert('❌ Lỗi khi tải danh sách nhân viên');
//     }
// };

// // === HIỂN THỊ DỮ LIỆU RA BẢNG ===

// let renderTableNhanVien = (dsNV) => {
//     let html = '';

//     for (let nv of dsNV) {
//         html += `
//       <tr>
//         <td>${nv.maNhanVien}</td>
//         <td>${nv.tenNhanVien}</td>
//         <td>${nv.chucVu}</td>
//         <td>${nv.heSoChucVu}</td>
//         <td>${nv.luongCoBan.toLocaleString()} đ</td>
//         <td>${nv.soGioLamTrongThang}</td>
//         <td>
//           <button class="btn btn-warning btn-sm me-1" onclick="suaNhanVien(${nv.maNhanVien})">Sửa</button>
//           <button class="btn btn-danger btn-sm" onclick="xoaNhanVien(${nv.maNhanVien})">Xoá</button>
//         </td>
//       </tr>
//     `;
//     }

//     document.querySelector('#employeeTable tbody').innerHTML = html;
// };

// // === HÀM LẤY DỮ LIỆU FORM ===

// let layDuLieuForm = () => {
//     return {
//         maNhanVien: +document.querySelector('#maNhanVien').value,
//         tenNhanVien: document.querySelector('#tenNhanVien').value,
//         chucVu: document.querySelector('#chucVu').value,
//         heSoChucVu: +document.querySelector('#heSoChucVu').value,
//         luongCoBan: +document.querySelector('#luongCoBan').value,
//         soGioLamTrongThang: +document.querySelector('#soGioLamTrongThang').value,
//     };
// };

// //POST === THÊM NHÂN VIÊN ===

// document.querySelector('#employeeForm').onsubmit = async (e) => {
//     e.preventDefault();
//     const nv = layDuLieuForm();

//     try {
//         await axios({
//             url: `${BASE_URL}/ThemNhanVien`,
//             method: 'POST',
//             data: nv,
//         });

//         alert('✅ Thêm nhân viên thành công!');
//         document.querySelector('#employeeForm').reset();
//         getAllNhanVien();
//     } catch (err) {
//         alert('❌ Lỗi khi thêm nhân viên: Mã nhân viên đã tồn tại hoặc dữ liệu không hợp lệ!');
//     }
// };

// //PUT === CẬP NHẬT NHÂN VIÊN ===

// document.querySelector('#btnCapNhat').onclick = async () => {
//     const nv = layDuLieuForm();

//     try {
//         await axios({
//             url: `${BASE_URL}/CapNhatThongTinNhanVien?maNhanVien=${nv.maNhanVien}`,
//             method: 'PUT',
//             data: nv,
//         });

//         alert('✅ Cập nhật thành công!');
//         document.querySelector('#employeeForm').reset();
//         getAllNhanVien();
//     } catch (err) {
//         alert('❌ Cập nhật thất bại!');
//     }
// };

// //DELETE === XOÁ NHÂN VIÊN ===

// window.xoaNhanVien = async (maNhanVien) => {
//     if (!confirm('Bạn chắc chắn muốn xoá nhân viên này?')) return;

//     try {
//         await axios({
//             url: `${BASE_URL}/XoaNhanVien?maSinhVien=${maNhanVien}`,
//             method: 'DELETE',
//         });

//         alert('🗑️ Đã xoá nhân viên');
//         getAllNhanVien();
//     } catch (err) {
//         alert('❌ Xoá thất bại!');
//     }
// };

// //GET === SỬA NHÂN VIÊN (ĐƯỢC LOAD LÊN FORM) ===

// window.suaNhanVien = async (maNhanVien) => {
//     try {
//         const res = await axios({
//             url: `${BASE_URL}/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
//             method: 'GET',
//         });

//         const nv = res.data;

//         document.querySelector('#maNhanVien').value = nv.maNhanVien;
//         document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
//         document.querySelector('#chucVu').value = nv.chucVu;
//         document.querySelector('#heSoChucVu').value = nv.heSoChucVu;
//         document.querySelector('#luongCoBan').value = nv.luongCoBan;
//         document.querySelector('#soGioLamTrongThang').value = nv.soGioLamTrongThang;
//     } catch (err) {
//         alert('❌ Lỗi khi tải thông tin nhân viên để sửa');
//     }
// };

// // === CHẠY NGAY KHI LOAD ===

// window.onload = () => {
//     getAllNhanVien();
// };

// // === AUTO REFRESH 5 GIÂY (OPTIONAL) ===

// setInterval(getAllNhanVien, 5000);

const BASE_URL = 'https://svcy.myclass.vn/api/QuanLyNhanVienApi';

// ==== HIỂN THÔNG BÁO ====

function showMessage(message, type = 'success') {
    const box = document.getElementById('messageBox');
    if (!box) return;

    box.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

    setTimeout(() => {
        box.innerHTML = '';
    }, 3000);
}

// ==== LẤY DANH SÁCH NHÂN VIÊN ====

let getAllNhanVien = async () => {
    try {
        const resp = await axios.get(`${BASE_URL}/LayDanhSachNhanVien`);
        renderTableNhanVien(resp.data);
    } catch (err) {
        showMessage('❌ Lỗi khi tải danh sách nhân viên!', 'danger');
    }
};

// ==== HIỂN THỊ DỮ LIỆU RA BẢNG ====

let renderTableNhanVien = (ds) => {
    const tbody = document.querySelector('#employeeTable tbody');
    let html = '';

    for (let nv of ds) {
        html += `
      <tr>
        <td>${nv.maNhanVien}</td>
        <td>${nv.tenNhanVien}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.heSoChucVu}</td>
        <td>${nv.luongCoBan.toLocaleString()} đ</td>
        <td>${nv.soGioLamTrongThang}</td>
        <td>
          <button class="btn btn-warning btn-sm me-1" onclick="suaNhanVien(${nv.maNhanVien})">Sửa</button>
          <button class="btn btn-danger btn-sm" onclick="xoaNhanVien(${nv.maNhanVien})">Xoá</button>
        </td>
      </tr>
    `;
    }

    tbody.innerHTML = html;
};

// ==== LẤY DỮ LIỆU TỪ FORM ====

let layDuLieuForm = () => {
    return {
        maNhanVien: +document.querySelector('#maNhanVien').value,
        tenNhanVien: document.querySelector('#tenNhanVien').value,
        chucVu: document.querySelector('#chucVu').value,
        heSoChucVu: +document.querySelector('#heSoChucVu').value,
        luongCoBan: +document.querySelector('#luongCoBan').value,
        soGioLamTrongThang: +document.querySelector('#soGioLamTrongThang').value,
    };
};

// ==== THÊM NHÂN VIÊN ====

document.querySelector('#employeeForm').onsubmit = async (e) => {
    e.preventDefault();
    const nv = layDuLieuForm();

    try {
        await axios.post(`${BASE_URL}/ThemNhanVien`, nv);
        showMessage('✅ Thêm nhân viên thành công!', 'success');
        document.querySelector('#employeeForm').reset();
        getAllNhanVien();
    } catch (err) {
        showMessage('❌ Thêm thất bại! Mã nhân viên có thể đã tồn tại.', 'danger');
    }
};

// ==== CẬP NHẬT NHÂN VIÊN ====

document.querySelector('#btnCapNhat').onclick = async () => {
    const nv = layDuLieuForm();

    try {
        await axios.put(`${BASE_URL}/CapNhatThongTinNhanVien?maNhanVien=${nv.maNhanVien}`, nv);
        showMessage('✅ Cập nhật thành công!', 'primary');
        document.querySelector('#employeeForm').reset();
        getAllNhanVien();
    } catch (err) {
        showMessage('❌ Cập nhật thất bại!', 'danger');
    }
};

// ==== XOÁ NHÂN VIÊN ====

window.xoaNhanVien = async (maNhanVien) => {
    if (!confirm('Bạn có chắc muốn xoá nhân viên này?')) return;

    try {
        await axios.delete(`${BASE_URL}/XoaNhanVien?maSinhVien=${maNhanVien}`);
        showMessage('🗑️ Xoá nhân viên thành công!', 'warning');
        getAllNhanVien();
    } catch (err) {
        showMessage('❌ Không thể xoá nhân viên!', 'danger');
    }
};

// ==== SỬA NHÂN VIÊN ====

window.suaNhanVien = async (maNhanVien) => {
    try {
        const res = await axios.get(`${BASE_URL}/LayThongTinNhanVien?maNhanVien=${maNhanVien}`);
        const nv = res.data;

        document.querySelector('#maNhanVien').value = nv.maNhanVien;
        document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
        document.querySelector('#chucVu').value = nv.chucVu;
        document.querySelector('#heSoChucVu').value = nv.heSoChucVu;
        document.querySelector('#luongCoBan').value = nv.luongCoBan;
        document.querySelector('#soGioLamTrongThang').value = nv.soGioLamTrongThang;

        showMessage('📄 Đã load dữ liệu nhân viên để chỉnh sửa.', 'info');
    } catch (err) {
        showMessage('❌ Lỗi khi tải thông tin nhân viên để sửa!', 'danger');
    }
};

// ==== INIT ====

window.onload = () => {
    getAllNhanVien();
};

// ==== TỰ ĐỘNG LÀM MỚI DANH SÁCH MỖI 5 GIÂY ====

setInterval(getAllNhanVien, 5000);