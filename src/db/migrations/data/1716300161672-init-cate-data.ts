import { ECategory } from '@/db/entities';
import { ICategory } from '@/db/interface';
import { TryCatch } from '@/modules/_base';
import { In, MigrationInterface, QueryRunner, Repository } from 'typeorm';

const twoLevelCategories = [
  {
    name: 'Thịt, cá, trứng, hải sản',
    icon: 'thit-ca-trung-hai-san-202205261517459292.png',
    id: '8686',
    children: [
      {
        name: 'Thịt heo',
        icon: 'https://cdn.tgdd.vn/Products/Images/8781/bhx/icon_8781.png',
      },
      {
        name: 'Thịt bò',
        icon: 'https://cdn.tgdd.vn/Products/Images/8139/bhx/thit-bo-cac-loai-202212051413547147.png',
      },
      {
        name: 'Thịt gà, vịt, chim',
        icon: 'https://cdn.tgdd.vn/Products/Images/8790/bhx/thit-ga-thit-vit-202212051413239059.png',
      },
      {
        name: 'Cá, hải sản',
        icon: 'https://cdn.tgdd.vn/Products/Images/8782/bhx/8782_st_2.png',
      },
      {
        name: 'Trứng gà, vịt, cút',
        icon: 'https://cdn.tgdd.vn/Products/Images/8783/bhx/trung-ga-vit-cut-202212051414238645.png',
      },
    ],
  },
  {
    name: 'Rau, củ, nấm, trái cây',
    icon: 'rau-cu-trai-cay-202205261519146845.png',
    id: '10298',
    children: [
      {
        name: 'Trái cây',
        icon: 'https://cdn.tgdd.vn/Products/Images/8788/bhx/trai-cay-cac-loai-202210311314516525.png',
      },
      {
        name: 'Rau lá',
        icon: 'https://cdn.tgdd.vn/Products/Images/8820/bhx/rau-la-cac-loai-202210311314254141.png',
      },
      {
        name: 'Củ, quả',
        icon: 'https://cdn.tgdd.vn/Products/Images/8785/bhx/rau-cu-cac-loai-202209301506432108.png',
      },
      {
        name: 'Nấm các loại',
        icon: 'https://cdn.tgdd.vn/Products/Images/8779/bhx/nam-cac-loai-202303081524361474.png',
      },
      {
        name: 'Rau, củ làm sẵn',
        icon: 'https://cdn.tgdd.vn/Products/Images/12439/bhx/rau-cu-lam-san-202308231530220239.png',
      },
      {
        name: 'Rau củ đông lạnh',
        icon: 'https://cdn.tgdd.vn/Products/Images/7172/bhx/rau-cu-dong-lanh-202212051420219285.png',
      },
    ],
  },
  {
    name: 'Dầu ăn, nước chấm, gia vị',
    icon: 'dau-an-nuoc-cham-gia-vi-202205261526194836.png',
    id: '7148',
    children: [
      {
        name: 'Dầu ăn',
        icon: 'https://cdn.tgdd.vn/Products/Images/2286/bhx/dau-an-202212060830181775.png',
      },
      {
        name: 'Nước mắm',
        icon: 'https://cdn.tgdd.vn/Products/Images/2289/bhx/nuoc-mam-202212051441046889.png',
      },
      {
        name: 'Nước tương',
        icon: 'https://cdn.tgdd.vn/Products/Images/2683/bhx/nuoc-tuong-202209301504550560.png',
      },
      {
        name: 'Đường',
        icon: 'https://cdn.tgdd.vn/Products/Images/2804/bhx/duong-cac-loai-202209301451483040.png',
      },
      {
        name: 'Hạt nêm, bột ngọt, bột canh',
        icon: 'https://cdn.tgdd.vn/Products/Images/2806/bhx/hat-nem-bot-ngot-bot-canh-202209301438042697.png',
      },
      {
        name: 'Muối',
        icon: 'https://cdn.tgdd.vn/Products/Images/2803/bhx/muoi-cac-loai-202212051440575176.png',
      },
      {
        name: 'Tương ớt - đen, mayonnaise',
        icon: 'https://cdn.tgdd.vn/Products/Images/2567/bhx/tuong-ot-den-mayonnaise-202209301521405358.png',
      },
      {
        name: 'Dầu hào, giấm, bơ',
        icon: 'https://cdn.tgdd.vn/Products/Images/3465/bhx/dau-hao-giam-bo-202212051442315139.png',
      },
      {
        name: 'Gia vị nêm sẵn',
        icon: 'https://cdn.tgdd.vn/Products/Images/8271/bhx/gia-vi-hoan-chinh-nem-san-202209301454403180.png',
      },
      {
        name: 'Nước chấm, mắm',
        icon: 'https://cdn.tgdd.vn/Products/Images/7779/bhx/nuoc-cham-mam-cac-loai-202209301502198411.png',
      },
      {
        name: 'Tiêu, sa tế, ớt bột',
        icon: 'https://cdn.tgdd.vn/Products/Images/2809/bhx/tieu-sa-te-ot-bot-202209301509446141.png',
      },
      {
        name: 'Bột nghệ, tỏi, hồi, quế,...',
        icon: 'https://cdn.tgdd.vn/Products/Images/8275/bhx/bot-nghe-toi-hoi-que-202209301438340170.png',
      },
    ],
  },
  {
    name: 'Kem, thực phẩm đông mát',
    icon: 'hang-dong-mat-202205261526078709.png',
    id: '10798',
    children: [
      {
        name: 'Bánh bao, bánh mì, pizza',
        icon: 'https://cdn.tgdd.vn/Products/Images/10778/bhx/banh-dong-cac-loai-202212051416441867.png',
      },
      {
        name: 'Xúc xích, lạp xưởng tươi',
        icon: 'https://cdn.tgdd.vn/Products/Images/7618/bhx/xuc-xich-lap-xuong-tuoi-202212051418012743.png',
      },
      {
        name: 'Chả lụa, thịt nguội',
        icon: 'https://cdn.tgdd.vn/Products/Images/7169/bhx/cha-lua-thit-nguoi-202212051418121397.png',
      },
      {
        name: 'Chả giò, chả ram',
        icon: 'https://cdn.tgdd.vn/Products/Images/7171/bhx/cha-gio-cha-ram-202212051418336344.png',
      },
      {
        name: 'Cá viên, bò viên',
        icon: 'https://cdn.tgdd.vn/Products/Images/7170/bhx/ca-vien-bo-vien-202212051418508324.png',
      },
      {
        name: 'Mandu, há cảo, sủi cảo',
        icon: 'https://cdn.tgdd.vn/Products/Images/7258/bhx/ha-cao-sui-cao-202209301455143181.png',
      },
      {
        name: 'Thịt, cá đông lạnh',
        icon: 'https://cdn.tgdd.vn/Products/Images/8400/bhx/thit-ca-dong-lanh-202212051420110663.png',
      },
      {
        name: 'Làm sẵn, ăn liền',
        icon: 'https://cdn.tgdd.vn/Products/Images/7259/bhx/lam-san-an-lien-202212051420429655.png',
      },
      {
        name: 'Nước lẩu, viên thả lẩu',
        icon: 'https://cdn.tgdd.vn/Products/Images/12538/bhx/nuoc-lau-vien-tha-lau-202303301959003647.png',
      },
      {
        name: 'Sơ chế, tẩm ướp',
        icon: 'https://cdn.tgdd.vn/Products/Images/8791/bhx/so-che-tam-uop-202212051422114754.png',
      },
      {
        name: 'Sữa chua ăn',
        icon: 'https://cdn.tgdd.vn/Products/Images/7558/bhx/sua-chua-an-202209301514279987.png',
      },
      {
        name: 'Bơ sữa, phô mai',
        icon: 'https://cdn.tgdd.vn/Products/Images/7599/bhx/bo-sua-pho-mai-202212051422389842.png',
      },
      {
        name: 'Sữa chua uống',
        icon: 'https://cdn.tgdd.vn/Products/Images/7598/bhx/sua-chua-uong-202212051422468585.png',
      },
      {
        name: 'Đậu hũ, tàu hũ',
        icon: 'https://cdn.tgdd.vn/Products/Images/7461/bhx/dau-hu-tau-hu-202212051424423071.png',
      },
      {
        name: 'Kim chi, đồ chua',
        icon: 'https://cdn.tgdd.vn/Products/Images/7459/bhx/kim-chi-do-chua-202212051424188794.png',
      },
      {
        name: 'Bánh flan, thạch, chè',
        icon: 'https://cdn.tgdd.vn/Products/Images/7460/bhx/banh-flan-thach-che-202212051425371283.png',
      },
      {
        name: 'Bún tươi, mì nưa',
        icon: 'https://cdn.tgdd.vn/Products/Images/9340/bhx/bun-tuoi-mi-nua-202212051425287783.png',
      },
      {
        name: 'Rau củ đông lạnh',
        icon: 'https://cdn.tgdd.vn/Products/Images/7172/bhx/rau-cu-dong-lanh-202212051420219285.png',
      },
    ],
  },
  {
    name: 'Mì, miến, cháo, phở',
    icon: 'mi-mien-chao-pho-202205261523011374.png',
    id: '7147',
    children: [
      {
        name: 'Mì ăn liền',
        icon: 'https://cdn.tgdd.vn/Products/Images/2565/bhx/mi-an-lien-202209301456432997.png',
      },
      {
        name: 'Hủ tiếu, miến',
        icon: 'https://cdn.tgdd.vn/Products/Images/2965/bhx/hu-tieu-mien-banh-canh-202209301458049760.png',
      },
      {
        name: 'Phở, bún ăn liền',
        icon: 'https://cdn.tgdd.vn/Products/Images/2566/bhx/pho-bun-an-lien-202209301506114557.png',
      },
      {
        name: 'Cháo gói, cháo tươi',
        icon: 'https://cdn.tgdd.vn/Products/Images/2564/bhx/chao-goi-chao-tuoi-202209301447169147.png',
      },
      {
        name: 'Bún các loại',
        icon: 'https://cdn.tgdd.vn/Products/Images/8163/bhx/bun-cac-loai-202212051428120862.png',
      },
      {
        name: 'Nui các loại',
        icon: 'https://cdn.tgdd.vn/Products/Images/8159/bhx/nui-cac-loai-202212051428214191.png',
      },
      {
        name: 'Miến, hủ tiếu, phở',
        icon: 'https://cdn.tgdd.vn/Products/Images/8160/bhx/mien-hu-tieu-pho-202212051429062024.png',
      },
      {
        name: 'Mì Ý, mì trứng',
        icon: 'https://cdn.tgdd.vn/Products/Images/8158/bhx/mi-y-mi-trung-202212051428525826.png',
      },
      {
        name: 'Bánh gạo Hàn Quốc',
        icon: 'https://cdn.tgdd.vn/Products/Images/7162/bhx/banh-gao-han-quoc-202209301431411477.png',
      },
    ],
  },
  {
    name: 'Gạo, bột, đồ khô',
    icon: 'gao-bot-do-kho-202205261527028047.png',
    id: '7149',
    children: [
      {
        name: 'Gạo các loại',
        icon: 'https://cdn.tgdd.vn/Products/Images/2513/bhx/gao-cac-loai-202209301453236694.png',
      },
      {
        name: 'Xúc xích',
        icon: 'https://cdn.tgdd.vn/Products/Images/3507/bhx/xuc-xich-202212051432208678.png',
      },
      {
        name: 'Cá hộp',
        icon: 'https://cdn.tgdd.vn/Products/Images/3237/bhx/ca-hop-cac-loai-202212051434464463.png',
      },
      {
        name: 'Đồ chay ăn liền',
        icon: 'https://cdn.tgdd.vn/Products/Images/8638/bhx/do-chay-an-lien-202212051436302695.png',
      },
      {
        name: 'Heo, bò, pate hộp',
        icon: 'https://cdn.tgdd.vn/Products/Images/3238/bhx/heo-bo-pate-hop-202212051434560792.png',
      },
      {
        name: 'Tương, chao các loại',
        icon: 'https://cdn.tgdd.vn/Products/Images/3525/bhx/tuong-chao-cac-loai-202212051436405632.png',
      },
      {
        name: 'Gia vị chay',
        icon: 'https://cdn.tgdd.vn/Products/Images/8645/bhx/gia-vi-chay-202212051436491680.png',
      },
      {
        name: 'Đậu hũ, đồ chay khác',
        icon: 'https://cdn.tgdd.vn/Products/Images/7082/bhx/dau-hu-do-chay-202212051438250632.png',
      },
      {
        name: 'Bột các loại',
        icon: 'https://cdn.tgdd.vn/Products/Images/2388/bhx/bot-cac-loai-202209301437207086.png',
      },
      {
        name: 'Đậu, nấm, đồ khô',
        icon: 'https://cdn.tgdd.vn/Products/Images/3235/bhx/dau-nam-do-kho-202212051438558777.png',
      },
      {
        name: 'Rong biển các loại',
        icon: 'https://cdn.tgdd.vn/Products/Images/7083/bhx/rong-bien-cac-loai-202212051438498726.png',
      },
      {
        name: 'Lạp xưởng',
        icon: 'https://cdn.tgdd.vn/Products/Images/3506/bhx/lap-xuong-202212051431460635.png',
      },
      {
        name: 'Cá mắm, dưa mắm',
        icon: 'https://cdn.tgdd.vn/Products/Images/8285/bhx/ca-mam-dua-mam-202205182003231192.png',
      },
      {
        name: 'Bánh phồng, bánh đa',
        icon: 'https://cdn.tgdd.vn/Products/Images/3234/bhx/banh-phong-banh-da-202212051439330319.png',
      },
      {
        name: 'Bánh tráng các loại',
        icon: 'https://cdn.tgdd.vn/Products/Images/3233/bhx/banh-trang-cac-loai-202212051439101897.png',
      },
      {
        name: 'Nước cốt dừa lon',
        icon: 'https://cdn.tgdd.vn/Products/Images/7086/bhx/nuoc-cot-dua-lon-202212051435508725.png',
      },
      {
        name: 'Rau củ, trái cây hộp',
        icon: 'https://cdn.tgdd.vn/Products/Images/7220/bhx/rau-cu-trai-cay-hop-202212051435574523.png',
      },
      {
        name: 'Ngũ cốc, yến mạch',
        icon: 'https://cdn.tgdd.vn/Products/Images/2903/bhx/ngu-coc-yen-mach-202212051439177796.png',
      },
    ],
  },
  {
    name: 'Bia, nước giải khát',
    icon: 'bia-nuoc-giai-khat-202205261528134559.png',
    id: '2488',
    children: [
      {
        name: 'Bia, nước có cồn',
        icon: 'https://cdn.tgdd.vn/Products/Images/2282/bhx/bia-nuoc-co-con-202403130931205434.png',
      },
      {
        name: 'Rượu',
        icon: 'https://cdn.tgdd.vn/Products/Images/9498/bhx/ruou-cac-loai-202210311315410232.png',
      },
      {
        name: 'Nước ép trái cây',
        icon: 'https://cdn.tgdd.vn/Products/Images/3265/bhx/nuoc-ep-trai-cay-202212051444585466.png',
      },
      {
        name: 'Nước ngọt',
        icon: 'https://cdn.tgdd.vn/Products/Images/2443/bhx/nuoc-ngot-202210311315510981.png',
      },
      {
        name: 'Nước tăng lực, bù khoáng',
        icon: 'https://cdn.tgdd.vn/Products/Images/3226/bhx/nuoc-tang-luc-bu-khoang-202212051444234280.png',
      },
      {
        name: 'Nước trà',
        icon: 'https://cdn.tgdd.vn/Products/Images/8938/bhx/nuoc-tra-cac-loai-202212051444451504.png',
      },
      {
        name: 'Sữa trái cây, trà sữa',
        icon: 'https://cdn.tgdd.vn/Products/Images/2947/bhx/sua-trai-cay-tra-sua-202212051448001525.png',
      },
      {
        name: 'Trái cây hộp, siro',
        icon: 'https://cdn.tgdd.vn/Products/Images/7579/bhx/trai-cay-hop-si-ro-202212051448090039.png',
      },
      {
        name: 'Nước suối',
        icon: 'https://cdn.tgdd.vn/Products/Images/2563/bhx/nuoc-suoi-202210311319484504.png',
      },
      {
        name: 'Cà phê hoà tan',
        icon: 'https://cdn.tgdd.vn/Products/Images/2524/bhx/ca-phe-hoa-tan-202212051448395456.png',
      },
      {
        name: 'Trà khô, túi lọc',
        icon: 'https://cdn.tgdd.vn/Products/Images/2385/bhx/tra-kho-tui-loc-202212051448551904.png',
      },
      {
        name: 'Cà phê pha phin',
        icon: 'https://cdn.tgdd.vn/Products/Images/2883/bhx/ca-phe-pha-phin-202212051449011758.png',
      },
      {
        name: 'Cà phê lon',
        icon: 'https://cdn.tgdd.vn/Products/Images/8966/bhx/ca-phe-lon-202212051449128859.png',
      },
      {
        name: 'Mật ong, bột nghệ',
        icon: 'https://cdn.tgdd.vn/Products/Images/7068/bhx/mat-ong-bot-nghe-202209301456180120.png',
      },
      {
        name: 'Nước yến, nước cốt gà',
        icon: 'https://cdn.tgdd.vn/Products/Images/4585/bhx/nuoc-yen-nuoc-cot-ga-202209301505264436.png',
      },
    ],
  },
  {
    name: 'Sữa các loại',
    icon: 'sua-cac-loai-202205261527388484.png',
    id: '7091',
    children: [
      {
        name: 'Sữa tươi',
        icon: 'https://cdn.tgdd.vn/Products/Images/2386/bhx/sua-tuoi-202210311320147075.png',
      },
      {
        name: 'Sữa ca cao, lúa mạch',
        icon: 'https://cdn.tgdd.vn/Products/Images/2945/bhx/sua-ca-cao-lua-mach-202210311320345026.png',
      },
      {
        name: 'Sữa chua uống liền',
        icon: 'https://cdn.tgdd.vn/Products/Images/2944/bhx/sua-chua-uong-lien-202212081456116368.png',
      },
      {
        name: 'Sữa bột',
        icon: 'https://cdn.tgdd.vn/Products/Images/2382/bhx/sua-bot-cac-loai-202209301512594596.png',
      },
      {
        name: 'Sữa hạt, sữa đậu',
        icon: 'https://cdn.tgdd.vn/Products/Images/2943/bhx/sua-hat-sua-dau-202209301516013024.png',
      },
      {
        name: 'Sữa đặc',
        icon: 'https://cdn.tgdd.vn/Products/Images/2526/bhx/sua-dac-202210311321319764.png',
      },
      {
        name: 'Ngũ cốc',
        icon: 'https://cdn.tgdd.vn/Products/Images/8286/bhx/ngu-coc-cac-loai-202209301502078311.png',
      },
      {
        name: 'Sữa chua ăn',
        icon: 'https://cdn.tgdd.vn/Products/Images/7558/bhx/sua-chua-an-202209301514279987.png',
      },
      {
        name: 'Bơ sữa, phô mai',
        icon: 'https://cdn.tgdd.vn/Products/Images/7599/bhx/bo-sua-pho-mai-202212051422389842.png',
      },
    ],
  },
  {
    name: 'Bánh kẹo các loại',
    icon: 'banh-keo-cac-loai-202205261518436969.png',
    id: '7143',
    children: [
      {
        name: 'Bánh gạo',
        icon: 'https://cdn.tgdd.vn/Products/Images/3361/bhx/banh-gao-202212051453477652.png',
      },
      {
        name: 'Bánh quy',
        icon: 'https://cdn.tgdd.vn/Products/Images/3357/bhx/banh-quy-202212051453352399.png',
      },
      {
        name: 'Bánh quế',
        icon: 'https://cdn.tgdd.vn/Products/Images/3359/bhx/banh-que-202212051454447088.png',
      },
      {
        name: 'Bánh snack, rong biển',
        icon: 'https://cdn.tgdd.vn/Products/Images/3364/bhx/snack-rong-bien-202210071644499789.png',
      },
      {
        name: 'Bánh Chocopie',
        icon: 'https://cdn.tgdd.vn/Products/Images/7622/bhx/banh-chocopie-202212051500226263.png',
      },
      {
        name: 'Bánh bông lan',
        icon: 'https://cdn.tgdd.vn/Products/Images/3358/bhx/banh-bong-lan-202212051455303744.png',
      },
      {
        name: 'Bánh tươi, Sandwich',
        icon: 'https://cdn.tgdd.vn/Products/Images/9027/bhx/banh-tuoi-sandwich-202212051416571062.png',
      },
      {
        name: 'Socola',
        icon: 'https://cdn.tgdd.vn/Products/Images/6597/bhx/keo-socola-202212051500103072.png',
      },
      {
        name: 'Kẹo cứng',
        icon: 'https://cdn.tgdd.vn/Products/Images/2687/bhx/keo-cung-202212051452559035.png',
      },
      {
        name: 'Bánh que',
        icon: 'https://cdn.tgdd.vn/Products/Images/3362/bhx/banh-que-202212051455083542.png',
      },
      {
        name: 'Kẹo dẻo, kẹo marshmallow',
        icon: 'https://cdn.tgdd.vn/Products/Images/7199/bhx/keo-deo-keo-marshmallow-202212051453042764.png',
      },
      {
        name: 'Kẹo singum',
        icon: 'https://cdn.tgdd.vn/Products/Images/4888/bhx/keo-singum-202212051453188782.png',
      },
      {
        name: 'Trái cây sấy',
        icon: 'https://cdn.tgdd.vn/Products/Images/3365/bhx/trai-cay-say-202212051455499058.png',
      },
      {
        name: 'Hạt khô',
        icon: 'https://cdn.tgdd.vn/Products/Images/3487/bhx/hat-kho-cac-loai-202212051456351944.png',
      },
      {
        name: 'Rau câu, thạch dừa',
        icon: 'https://cdn.tgdd.vn/Products/Images/3368/bhx/rau-cau-cac-loai-202212051458073747.png',
      },
      {
        name: 'Khô chế biến sẵn',
        icon: 'https://cdn.tgdd.vn/Products/Images/8318/bhx/kho-che-bien-san-202212051458159836.png',
      },
      {
        name: 'Cơm cháy, bánh tráng',
        icon: 'https://cdn.tgdd.vn/Products/Images/8320/bhx/com-chay-banh-trang-202212051459537097.png',
      },
      {
        name: 'Bánh xốp',
        icon: 'https://cdn.tgdd.vn/Products/Images/3360/bhx/banh-xop-202212051454546945.png',
      },
      {
        name: 'Ngũ cốc, yến mạch',
        icon: 'https://cdn.tgdd.vn/Products/Images/2903/bhx/ngu-coc-yen-mach-202212051439177796.png',
      },
    ],
  },
  {
    name: 'Chăm sóc cá nhân',
    icon: 'cham-soc-ca-nhan-202312151410200332.png',
    id: '2515',
    children: [
      {
        name: 'Dầu gội',
        icon: 'https://cdn.tgdd.vn/Products/Images/2483/bhx/dau-goi-202212051502400838.png',
      },
      {
        name: 'Dầu xả',
        icon: 'https://cdn.tgdd.vn/Products/Images/2484/bhx/dau-xa-202212051502527473.png',
      },
      {
        name: 'Sữa tắm',
        icon: 'https://cdn.tgdd.vn/Products/Images/2444/bhx/sua-tam-202212051505236205.png',
      },
      {
        name: 'Kem đánh răng, súc miệng',
        icon: 'https://cdn.tgdd.vn/Products/Images/2446/bhx/kem-danh-rang-suc-mieng-202401101410492074.png',
      },
      {
        name: 'Bàn chải đánh răng',
        icon: 'https://cdn.tgdd.vn/Products/Images/2491/bhx/ban-chai-danh-rang-202212051521282311.png',
      },
      {
        name: 'Giấy vệ sinh',
        icon: 'https://cdn.tgdd.vn/Products/Images/9081/bhx/giay-ve-sinh-202212051502079595.png',
      },
      {
        name: 'Khăn giấy',
        icon: 'https://cdn.tgdd.vn/Products/Images/3004/bhx/khan-giay-202212051502000923.png',
      },
      {
        name: 'Khăn ướt',
        icon: 'https://cdn.tgdd.vn/Products/Images/3003/bhx/khan-uot-202212051502211367.png',
      },
      {
        name: 'Băng vệ sinh',
        icon: 'https://cdn.tgdd.vn/Products/Images/2516/bhx/bang-ve-sinh-202212051524212476.png',
      },
      {
        name: 'Nước rửa tay',
        icon: 'https://cdn.tgdd.vn/Products/Images/2486/bhx/nuoc-rua-tay-202212051523389271.png',
      },
      {
        name: 'Xà bông cục',
        icon: 'https://cdn.tgdd.vn/Products/Images/2485/bhx/xa-bong-cuc-202205181923035288.png',
      },
      {
        name: 'Lăn xịt khử mùi',
        icon: 'https://cdn.tgdd.vn/Products/Images/2507/bhx/lan-xit-khu-mui-202212051505410311.png',
      },
      {
        name: 'Dao, bọt cạo râu',
        icon: 'https://cdn.tgdd.vn/Products/Images/3485/bhx/dao-cao-rau-202205310900480770.png',
      },
      {
        name: 'Bao cao su, gel bôi trơn',
        icon: 'https://cdn.tgdd.vn/Products/Images/2519/bhx/bao-cao-su-202210081411590872.png',
      },
      {
        name: 'Khẩu trang',
        icon: 'https://cdn.tgdd.vn/Products/Images/5872/bhx/khau-trang-202212051523542014.png',
      },
      {
        name: 'Kem dưỡng, chống nắng',
        icon: 'https://cdn.tgdd.vn/Products/Images/6562/bhx/kem-duong-da-serum-202212051509007604.png',
      },
      {
        name: 'Tã cho người lớn',
        icon: 'https://cdn.tgdd.vn/Products/Images/3425/bhx/ta-cho-nguoi-lon-202212051525006143.png',
      },
      {
        name: 'Thuốc nhuộm tóc',
        icon: 'https://cdn.tgdd.vn/Products/Images/7478/bhx/thuoc-nhuom-toc-202212051504392150.png',
      },
      {
        name: 'Tăm bông',
        icon: 'https://cdn.tgdd.vn/Products/Images/3124/bhx/tam-bong-202212051525590346.png',
      },
      {
        name: 'Dung dịch vệ sinh',
        icon: 'https://cdn.tgdd.vn/Products/Images/2517/bhx/dung-dich-ve-sinh-202212051524359526.png',
      },
      {
        name: 'Tẩy trang',
        icon: 'https://cdn.tgdd.vn/Products/Images/3708/bhx/tay-trang-202212051508046173.png',
      },
      {
        name: 'Mặt nạ',
        icon: 'https://cdn.tgdd.vn/Products/Images/6653/bhx/mat-na-202212051508179101.png',
      },
      {
        name: 'Nước hoa',
        icon: 'https://cdn.tgdd.vn/Products/Images/11238/bhx/nuoc-hoa-202212051506064667.png',
      },
      {
        name: 'Quần lót một lần',
        icon: 'https://cdn.tgdd.vn/Products/Images/7700/bhx/quan-lot-mot-lan-202212051524522537.png',
      },
      {
        name: 'Sữa dưỡng thể',
        icon: 'https://cdn.tgdd.vn/Products/Images/3104/bhx/sua-duong-the-202212051505533163.png',
      },
      {
        name: 'Kem ủ, keo vuốt tóc',
        icon: 'https://cdn.tgdd.vn/Products/Images/3740/bhx/kem-u-keo-vuot-toc-202212051504320839.png',
      },
      {
        name: 'Kem tẩy lông',
        icon: 'https://cdn.tgdd.vn/Products/Images/5436/bhx/kem-tay-long-202212051506565652.png',
      },
      {
        name: 'Kem, xịt côn trùng',
        icon: 'https://cdn.tgdd.vn/Products/Images/7658/bhx/kem-xit-con-trung-202212051507047902.png',
      },
      {
        name: 'Sữa rửa mặt',
        icon: 'https://cdn.tgdd.vn/Products/Images/2504/bhx/sua-rua-mat-202212051507446155.png',
      },
    ],
  },
  {
    name: 'Sản phẩm cho mẹ và bé',
    icon: 'san-pham-me-va-be-202205261527159118.png',
    id: '8679',
    children: [
      {
        name: 'Tắm gội cho bé',
        icon: 'https://cdn.tgdd.vn/Products/Images/8678/bhx/tam-goi-cho-be-202212051530353065.png',
      },
      {
        name: 'Sữa tắm, dầu gội cho bé',
        icon: 'https://cdn.tgdd.vn/Products/Images/3026/bhx/sua-tam-dau-goi-cho-be-202212051530494124.png',
      },
      {
        name: 'Nước xả cho bé',
        icon: 'https://cdn.tgdd.vn/Products/Images/3023/bhx/nuoc-xa-cho-be-202212051532237970.png',
      },
      {
        name: 'Kem đánh răng bé',
        icon: 'https://cdn.tgdd.vn/Products/Images/3028/bhx/kem-danh-rang-be-202212051533236668.png',
      },
      {
        name: 'Bàn chải cho bé',
        icon: 'https://cdn.tgdd.vn/Products/Images/3027/bhx/ban-chai-cho-be-202212051533406498.png',
      },
      {
        name: 'Khẩu trang, tăm bông',
        icon: 'https://cdn.tgdd.vn/Products/Images/8681/bhx/khau-trang-tam-bong-202212051534204766.png',
      },
      {
        name: 'Phấn thơm, dưỡng ẩm',
        icon: 'https://cdn.tgdd.vn/Products/Images/3063/bhx/phan-thom-duong-am-202212051534367561.png',
      },
      {
        name: 'Bình sữa, núm vú',
        icon: 'https://cdn.tgdd.vn/Products/Images/8683/bhx/binh-sua-num-vu-202212051534477778.png',
      },
      {
        name: 'Đồ dùng cho bé',
        icon: 'https://cdn.tgdd.vn/Products/Images/9943/bhx/do-dung-cho-be-202212051535092287.png',
      },
    ],
  },
  {
    name: 'Vệ sinh nhà cửa',
    icon: 've-sinh-nha-cua-202205261522333668.png',
    id: '7160',
    children: [
      {
        name: 'Nước giặt',
        icon: 'https://cdn.tgdd.vn/Products/Images/2464/bhx/icon_2464.png',
      },
      {
        name: 'Nước xả',
        icon: 'https://cdn.tgdd.vn/Products/Images/2465/bhx/nuoc-xa-vai-202212051537595816.png',
      },
      {
        name: 'Bột giặt',
        icon: 'https://cdn.tgdd.vn/Products/Images/2463/bhx/bot-giat-202212051536273225.png',
      },
      {
        name: 'Nước rửa chén',
        icon: 'https://cdn.tgdd.vn/Products/Images/2387/bhx/nuoc-rua-chen-202210311322508748.png',
      },
      {
        name: 'Nước lau nhà',
        icon: 'https://cdn.tgdd.vn/Products/Images/2510/bhx/nuoc-lau-san-202210311323136947.png',
      },
      {
        name: 'Tẩy rửa nhà tắm',
        icon: 'https://cdn.tgdd.vn/Products/Images/2511/bhx/tay-rua-nha-tam-202210311323011484.png',
      },
      {
        name: 'Bình xịt côn trùng',
        icon: 'https://cdn.tgdd.vn/Products/Images/2530/bhx/binh-xit-con-trung-202210311323248524.png',
      },
      {
        name: 'Xịt phòng, sáp thơm',
        icon: 'https://cdn.tgdd.vn/Products/Images/3345/bhx/xit-phong-sap-thom-202210081430331433.png',
      },
      {
        name: 'Lau kính, lau bếp',
        icon: 'https://cdn.tgdd.vn/Products/Images/2787/bhx/nuoc-lau-kinh-lau-bep-202212051539258092.png',
      },
      {
        name: 'Nước tẩy',
        icon: 'https://cdn.tgdd.vn/Products/Images/2493/bhx/nuoc-tay-202212051538148720.png',
      },
      {
        name: 'Túi đựng rác',
        icon: 'https://cdn.tgdd.vn/Products/Images/6553/bhx/tui-dung-rac-202210081432445361.png',
      },
    ],
  },
  {
    name: 'Đồ dùng gia đình',
    icon: 'do-dung-gia-dinh-202205270959286675.png',
    id: '3185',
    children: [
      {
        name: 'Túi đựng rác',
        icon: 'https://cdn.tgdd.vn/Products/Images/6553/bhx/tui-dung-rac-202210081432445361.png',
      },
      {
        name: 'Màng bọc, giấy thấm dầu',
        icon: 'https://cdn.tgdd.vn/Products/Images/4326/bhx/mang-boc-giay-tham-dau-202210311323343303.png',
      },
      {
        name: 'Đồ dùng một lần',
        icon: 'https://cdn.tgdd.vn/Products/Images/4352/bhx/do-dung-mot-lan-202210081433311551.png',
      },
      {
        name: 'Hộp đựng thực phẩm',
        icon: 'https://cdn.tgdd.vn/Products/Images/4929/bhx/hop-dung-thuc-pham-202212051546029515.png',
      },
      {
        name: 'Bút bi, thước kẻ',
        icon: 'https://cdn.tgdd.vn/Products/Images/10338/bhx/but-thuoc-gom-tay-202212051549593592.png',
      },
      {
        name: 'Băng keo, bao thư',
        icon: 'https://cdn.tgdd.vn/Products/Images/10340/bhx/do-van-phong-khac-202212051550475444.png',
      },
      {
        name: 'Khăn lau bếp',
        icon: 'https://cdn.tgdd.vn/Products/Images/3728/bhx/khan-lau-bep-202401081548400688.png',
      },
      {
        name: 'Miếng rửa chén',
        icon: 'https://cdn.tgdd.vn/Products/Images/3732/bhx/mieng-rua-chen-202212051554553485.png',
      },
      {
        name: 'Nhấc lót nồi',
        icon: 'https://cdn.tgdd.vn/Products/Images/7694/bhx/nhac-lot-noi-long-ban-202212051555318220.png',
      },
      {
        name: 'Pin tiểu',
        icon: 'https://cdn.tgdd.vn/Products/Images/56/bhx/pin-tieu-cac-loai-202212051556156785.png',
      },
      {
        name: 'Khăn tắm, bông tắm',
        icon: 'https://cdn.tgdd.vn/Products/Images/3727/bhx/khan-tam-bong-tam-202212051556244976.png',
      },
      {
        name: 'Bàn chải, thảm các loại',
        icon: 'https://cdn.tgdd.vn/Products/Images/3188/bhx/dung-cu-ve-sinh-202212051557002112.png',
      },
    ],
  },
];

export class InitCateData1716300161672 implements MigrationInterface {
  name: string = InitCateData1716300161672.name;

  async saveLv2Category(
    categoryRepo: Repository<ECategory>,
    cate: ICategory,
    parentId: string,
    index: number,
  ) {
    const payloadCate: ICategory = {
      name: cate.name,
      icon: cate.icon,
      level: 2,
      isLeaf: true,
      displayOrder: index,
      parentId,
    };

    return categoryRepo.save(payloadCate);
  }

  async saveLv2Categories(
    categoryRepo: Repository<ECategory>,
    lv2Cates: ICategory[],
    parentId: string,
  ) {
    return Promise.all(
      lv2Cates.map((cate, index) => {
        return this.saveLv2Category(categoryRepo, cate, parentId, index);
      }),
    );
  }

  async saveL1Category(
    categoryRepo: Repository<ECategory>,
    cate: ICategory,
    index: number,
  ): Promise<ECategory> {
    const newL1Cate: ICategory = {
      name: cate.name,
      icon: `https://cdn.tgdd.vn/Products/Images/${cate.id}/bhx/${cate.icon}`,
      level: 1,
      isLeaf: false,
      displayOrder: index,
    };

    return categoryRepo.save(newL1Cate);
  }

  @TryCatch()
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categoryRepo = queryRunner.connection.getRepository(ECategory);

    await Promise.all(
      twoLevelCategories.map(async (lv1Cate, index) => {
        const parentCategory = await this.saveL1Category(
          categoryRepo,
          lv1Cate,
          index,
        );

        return this.saveLv2Categories(
          categoryRepo,
          lv1Cate.children,
          parentCategory.id,
        );
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .getRepository(ECategory)
      .delete({ level: In([1, 2]) });
  }
}
