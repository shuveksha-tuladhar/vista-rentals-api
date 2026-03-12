# frozen_string_literal: true

admin_user = User.find_by(role: 'admin')

if admin_user.nil?
  puts 'No admin user found. Please seed an admin user before creating properties.'
else
  property_image_data = {
    'My Property' => ['https://a0.muscache.com/im/pictures/7207302b-1707-49fa-a6ec-6fe66c32f3e5.jpg',
                      'https://a0.muscache.com/im/pictures/2be32e3f-7647-4a9e-811d-2e74cf857af3.jpg?im_w=1440',
                      'https://a0.muscache.com/im/pictures/0faa8bf8-0efa-4d2c-9b09-37fac8b18e36.jpg?im_w=1440',
                      'https://a0.muscache.com/im/pictures/b7bd5ed8-3fb5-41da-9ca9-08bfc802c401.jpg?im_w=1440',
                      'https://a0.muscache.com/im/pictures/7825aedc-624d-4ef4-8354-acaa9cccf8d7.jpg?im_w=1440'],
    'My Village' => ['https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMyMjQ2NTYwODg5NjgxMzIzMA%3D%3D/original/5a900869-9b4c-4bc5-85f8-d2f0c934537c.jpeg?im_w=1200',
                     'https://a0.muscache.com/im/pictures/miso/Hosting-1314248188157667358/original/893763f9-3164-4ca5-b839-4a9a6ae62f86.jpeg?im_w=1440',
                     'https://a0.muscache.com/im/pictures/miso/Hosting-1314248188157667358/original/ffdba362-546f-4c3c-aec6-1a8d0a869166.jpeg?im_w=1440',
                     'https://a0.muscache.com/im/pictures/miso/Hosting-1314248188157667358/original/5315e204-0046-4400-bf2c-bc5eed4d9220.jpeg?im_w=1440',
                     'https://a0.muscache.com/im/pictures/miso/Hosting-1314248188157667358/original/66d932bf-71aa-4947-b9c2-cd2961f365d4.jpeg?im_w=1440'],
    'My cabin house' => ['https://a0.muscache.com/im/pictures/miso/Hosting-1311339745870663573/original/de77e090-a61d-4ab9-84fc-88e1b4e9e5d1.jpeg?im_w=1200',
                         'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMxMTcxNjA5MDQ0MzcyNDQ2MA==/original/ef89e78a-8c66-4b44-b1a7-ef391a72ff14.jpeg?im_w=1200',
                         'https://a0.muscache.com/im/pictures/miso/Hosting-1311716090443724460/original/1df97620-5311-4968-afc3-3e3f04f5583d.jpeg?im_w=1440',
                         'https://a0.muscache.com/im/pictures/miso/Hosting-1311716090443724460/original/9c4be99c-619a-4953-9511-4cf0f1ed3983.jpeg?im_w=1440',
                         'https://a0.muscache.com/im/pictures/miso/Hosting-1311716090443724460/original/6249ef28-a6ac-4f9e-a35c-0a890e71bbc2.jpeg?im_w=1440'],
    'Beachside Retreat' => ['https://a0.muscache.com/im/pictures/miso/Hosting-1179791415409569964/original/067e0ae9-d5ff-4d23-8455-4c6418bd3934.jpeg?im_w=1200',
                            'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTc0OTYwOTc4MzA1NTY2MTA3/original/052a10ca-ebf9-4ec3-ac7e-f2c16b68fc2e.jpeg?im_w=1200',
                            'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTc0OTYwOTc4MzA1NTY2MTA3/original/e56a243e-6bce-4f32-a718-257141048461.jpeg?im_w=1440',
                            'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTc0OTYwOTc4MzA1NTY2MTA3/original/19226efd-cf2c-4d7a-8af1-0ef53f0865fa.jpeg?im_w=1440',
                            'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTc0OTYwOTc4MzA1NTY2MTA3/original/15ba8977-7527-41be-b3fc-2077ec846551.jpeg?im_w=1440'],
    'Mountain Escape' => ['https://a0.muscache.com/im/pictures/miso/Hosting-1185412033137574849/original/77f82c27-189b-4da9-9bce-ed25b49aa697.jpeg?im_w=1200',
                          'https://a0.muscache.com/im/pictures/hosting/Hosting-1546447042491424271/original/c459ff61-3cfb-4dec-a7e0-e66864ae816b.jpeg?im_w=1440',
                          'https://a0.muscache.com/im/pictures/hosting/Hosting-1546447042491424271/original/ff57c6d3-1f87-4f30-bb9c-6e5995049cc6.jpeg?im_w=1440',
                          'https://a0.muscache.com/im/pictures/hosting/Hosting-1546447042491424271/original/1882b8e8-c2d2-489f-9406-1d4270872540.jpeg?im_w=1440',
                          'https://a0.muscache.com/im/pictures/hosting/Hosting-1546447042491424271/original/58560807-e020-4d36-9693-5a4ed4265347.jpeg?im_w=1200'],
    'Rustic Cabin' => ['https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI0NzEzNjkwNDU0NzkyMTI2Mg==/original/51a8b735-7a38-4791-944e-6e988ad6e268.jpeg?im_w=1200',
                       'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025513924579593970/original/4f58f422-0224-43c1-8d93-4f6b4024b29f.jpeg?im_w=1440',
                       'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025513924579593970/original/162613a6-be11-41c5-ade0-cf7c135f5202.jpeg?im_w=1440',
                       'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025513924579593970/original/6a26f831-eaa9-4666-8229-b9e44e3d4c03.jpeg?im_w=1440',
                       'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1025513924579593970/original/5254b506-4adb-4d8f-b0dc-108466c6dd5e.jpeg?im_w=1440'],
    'Red Rock Haven' => ['https://a0.muscache.com/im/pictures/prohost-api/Hosting-634779518286767410/original/12ee36e6-436a-4cf7-b0eb-bd067c124fd5.jpeg?im_w=1200',
                         'https://a0.muscache.com/im/pictures/miso/Hosting-585379663047737146/original/8d794fd9-58dc-4569-a351-c984bfabfd9d.jpeg?im_w=1440',
                         'https://a0.muscache.com/im/pictures/miso/Hosting-1229734781421631886/original/c7beb408-d86e-40b2-8d1f-7cb9d734e64b.jpeg?im_w=1440',
                         'https://a0.muscache.com/im/pictures/miso/Hosting-1229734781421631886/original/21aa16d4-a8db-4e35-8138-cc1a8e046759.jpeg?im_w=1440',
                         'https://a0.muscache.com/im/pictures/miso/Hosting-1229734781421631886/original/e798c869-1b74-4646-b4a4-1bc6172352fb.jpeg?im_w=1440'],
    'Lakeside Lodge' => ['https://a0.muscache.com/im/pictures/hosting/Hosting-1564616488277985216/original/0580b899-f9a4-444d-9dac-b3551e66b9bc.jpeg?im_w=1440',
                         'https://a0.muscache.com/im/pictures/hosting/Hosting-1564616488277985216/original/7be7d339-5ddb-4da8-9f62-95586b01a9cc.jpeg?im_w=1440',
                         'https://a0.muscache.com/im/pictures/hosting/Hosting-1564616488277985216/original/02b337cd-cf3f-43f8-acdd-076742b76378.jpeg?im_w=1440',
                         'https://a0.muscache.com/im/pictures/hosting/Hosting-1564616488277985216/original/1e2da2ef-b370-4d34-a290-7e366a3d4386.jpeg?im_w=1440'],
    'Historic French Quarter Home' => ['https://a0.muscache.com/im/pictures/prohost-api/Hosting-1495150359724918688/original/1902e6fc-963b-4f69-9eeb-673f146adce5.png?im_w=1440'],
    'Ocean View Villa' => ['https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIxNjk4NjA3ODk5NTc2NjkyNg%3D%3D/original/d7d809c2-c6e4-4d63-b44c-7507f3157093.jpeg?im_w=1200',
                           'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIxNjk4NjA3ODk5NTc2NjkyNg%3D%3D/original/2e2571ce-5fde-45f2-a5d8-d3769fe976b1.jpeg?im_w=1440',
                           'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIxNjk4NjA3ODk5NTc2NjkyNg%3D%3D/original/f800a3da-3b3f-476b-92c3-eee4db60f6a1.jpeg?im_w=1200',
                           'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIxNjk4NjA3ODk5NTc2NjkyNg%3D%3D/original/2e2571ce-5fde-45f2-a5d8-d3769fe976b1.jpeg?im_w=1440',
                           'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTIxNjk4NjA3ODk5NTc2NjkyNg%3D%3D/original/f800a3da-3b3f-476b-92c3-eee4db60f6a1.jpeg?im_w=1200'],
    'Urban Loft' => [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1479151942413843169/original/b4a332a6-e856-48a3-a250-e9bcbcf67e6e.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1479151942413843169/original/13a5fe4a-56e6-4aba-8b6c-c6d3364f4b32.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1479151942413843169/original/78ff7480-9a94-49aa-9160-398d0b929f53.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1479151942413843169/original/15e859a1-d21c-4e78-88a3-2fcdb8e98730.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1479151942413843169/original/71d9337c-afe8-40e7-ad45-036bb46dc34a.jpeg?im_w=1440'
    ],
    'Texas Ranch House' => [
      'https://a0.muscache.com/im/pictures/miso/Hosting-603091137051606684/original/00d36e46-6ad1-4b74-817b-a763906be955.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-603091137051606684/original/57821424-6c78-455b-8f25-deed243c8eb4.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/0fb7feff-b5c7-4ebb-a6c4-2e7627dba2aa.jpg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-603091137051606684/original/178c2d3c-7857-421c-a81c-4bab853296b1.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-603091137051606684/original/130c8647-e180-4364-b961-55d040d7bd8b.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/90f047c5-3247-4453-8532-f1277d02a57b.jpg?im_w=1440'
    ],
    'Vineyard Estate' => [
      'https://a0.muscache.com/im/pictures/miso/Hosting-913700305026663295/original/e1766102-a3f5-488e-84ae-7629937bbee2.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzNzAwMzA1MDI2NjYzMjk1/original/a15eb7bb-2cd4-4d12-b4fd-a7885c7816fa.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-913700305026663295/original/44642e54-5f24-4d09-bf06-b2fd96adb101.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-913700305026663295/original/77a651aa-dfe1-4515-901a-c12f625f5822.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-913700305026663295/original/70a8d6a9-5959-4350-92f9-c6b0d57388db.jpeg?im_w=1440'
    ],
    'Harbor View Condo' => [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1471146357212537672/original/c8a39b74-3fbe-42d1-8bab-92a653e066f2.png?im_w=1200', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1471146357212537672/original/468f84c2-ddac-4374-912c-b2bfa9097f75.png?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1471146357212537672/original/2c77673c-d34f-4e32-b2ac-23f6924f19ab.png?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1471146357212537672/original/0b5cd38b-933b-43f9-8d73-579abee4c9aa.png?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1471146357212537672/original/12d20660-5fee-4e69-b975-e21d4000af37.png?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1471146357212537672/original/88565e68-b167-4630-9afb-331ada4e20f6.jpeg?im_w=1440'
    ],
    'Alpine Chalet' => [
      'https://a0.muscache.com/im/pictures/miso/Hosting-45354935/original/5fcd58d8-70f1-4aa0-945d-7db4b3115630.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-20424007/original/74284ada-31bf-4d27-a07a-b3670f3fb468.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/hosting/Hosting-20424007/original/2bd5ad12-ce38-447d-a481-98517a0d4b53.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-20424007/original/eaf36c15-f43d-4124-b6be-53dba1ac2961.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-20424007/original/f9776bb7-a13f-49af-b908-510f87b243f5.jpeg?im_w=1440'
    ],
    'Smoky Mountain Cabin' => [
      'https://a0.muscache.com/im/pictures/miso/Hosting-1111917115884780923/original/1ff724ec-bb24-4a36-9d24-842dcf9346be.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/miso/Hosting-1111917115884780923/original/410ef18a-efb4-4a16-a215-2f9e78152afd.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-1111917115884780923/original/45a4b445-40c3-488a-b5e5-c445239489e8.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-1111917115884780923/original/87ae2840-8f0f-46a2-81fb-09f64d54aeb0.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-1111917115884780923/original/93d02d8e-3576-4955-91a1-2e221fbe6f41.jpeg?im_w=1440'
    ],
    'South Beach Apartment' => [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-40942209/original/9f9385ac-900c-4bcb-ae28-3d94d2b0b4bd.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-40942209/original/aad506b9-3dab-4d0b-8091-94b99df2042e.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-40942209/original/4e8a343c-f30c-4148-88ef-cea9144d396f.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-40942209/original/40a1cd72-e24b-4a61-958d-d9185592bbb5.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-40942209/original/1916bbd4-96a7-46bb-b6d3-11d7a9ea7d16.jpeg?im_w=1440'
    ],
    'Desert Adventure Base' => [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1346342755767821071/original/8e7ecabd-0235-42af-a1ac-dafe3d333f3e.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1346342755767821071/original/9bda6d4d-fce8-4671-80e2-f20b32593d20.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1346342755767821071/original/664e66f1-f6e5-46e2-85b5-b342889fe442.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1346342755767821071/original/0672cdbe-0b00-4c79-ad61-9d65fb5031ae.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1346342755767821071/original/01c66f0c-4467-460e-92c5-245b74a2cc87.jpeg?im_w=1440'
    ],
    "Fisherman's Wharf Loft" => [
      'https://a0.muscache.com/im/pictures/615f7057-74f9-440e-8b72-07721a31a71f.jpg?im_w=1440', 'https://a0.muscache.com/im/pictures/6c227613-04d1-496c-9bef-332b18773639.jpg?im_w=1440', 'https://a0.muscache.com/im/pictures/6f638aea-986d-47f6-b170-1a667574d423.jpg?im_w=1440', 'https://a0.muscache.com/im/pictures/303fa6b5-df7d-4d92-9c1b-e6677aaa3fdf.jpg?im_w=1440', 'https://a0.muscache.com/im/pictures/d05126c6-e657-405c-ab8e-76b72b83c4af.jpg?im_w=1440'
    ],
    'Historic District Home' => [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1556837970166553256/original/e3fb437c-8c57-4dd6-a143-20dc8e33ae88.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1556837970166553256/original/c7df395b-ada6-4647-86a1-6fc7600276ba.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1556837970166553256/original/816cd54a-191e-4181-82fc-f72d79b86c57.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1556837970166553256/original/64561e80-9b75-4a3f-a51f-91ed57b5cb50.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1556837970166553256/original/b145daa2-dc59-49be-bb33-f8a3c9ae054f.jpeg?im_w=1440'
    ],
    'Cliffside Retreat' => [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDYwNzE0NDI%3D/original/9623cb1f-2a18-43a4-a140-b0949ffcbd7c.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDYwNzE0NDI%3D/original/b396bd6d-a875-4673-a79e-4bc32ab6b182.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDYwNzE0NDI%3D/original/90c4dd7a-1c93-4ec3-a447-98621a752249.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDYwNzE0NDI%3D/original/6394197f-ffec-411b-a458-28b5e96b77ce.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/9010b328-7d13-4a6c-9746-dcc8d1a226be.jpg?im_w=1440'
    ],
    'Adobe Casita' => [
      'https://a0.muscache.com/im/pictures/miso/Hosting-724679124095470496/original/19c56410-4d80-4c9d-8e44-e964895f0fcb.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/miso/Hosting-724679124095470496/original/ffb16e5a-6ebc-43a7-ad9b-f97064daf1bd.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-724679124095470496/original/db600fbe-4003-411d-935e-973998dd0d6b.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-724679124095470496/original/0e429631-9c8a-4757-aa58-f1f5e458ad97.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-724679124095470496/original/bd88877b-12c3-4196-9ee9-d53605489bdc.jpeg?im_w=1440'
    ],
    'Tropical Paradise' => [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1528534980638482095/original/f1a253b3-c912-4d5a-a2b1-279238409fd7.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1528534980638482095/original/6a395747-b1a6-46b2-a117-b8f1e2bbd7cf.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1528534980638482095/original/74a593a5-14cb-46e9-bdc3-2549404257e6.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1528534980638482095/original/233b9e60-b56e-4d9d-a6c8-5358e7c1d03e.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1528534980638482095/original/ab843c8d-4d84-40bc-b73f-931aff54fb53.jpeg?im_w=1440'
    ],
    'Wine Country Cottage' => [
      'https://a0.muscache.com/im/pictures/miso/Hosting-564611497647698647/original/b9686399-5c21-41ee-b331-0d7743fc6882.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-564611497647698647/original/0ee6e311-e617-44cb-81a6-7e83ccfe17c6.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-564611497647698647/original/7e574a24-5c81-47d5-82d9-19744dfdd5be.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-564611497647698647/original/6dfe11b9-cae8-4170-8b40-a870291761bc.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-564611497647698647/original/c412cf65-8ea2-4d1a-b3bc-44adb302725e.jpeg?im_w=1440'
    ],
    'Mountain Peak Lodge' => [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-862881262755030799/original/1111d49b-20b2-4c5c-bb63-b99a98000bbd.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-862881262755030799/original/623deccb-ec3f-4348-9ba3-0a8d199bf635.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-862881262755030799/original/8558743f-c25d-48fa-8710-7c08e70c5241.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-862881262755030799/original/76e2f11a-6ad6-499d-a5c3-dca71c335446.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-862881262755030799/original/df3c61cc-4f5d-4d98-ae2a-97d92cc08649.jpeg?im_w=1440'
    ],
    'Cajun Country Home' => [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1118179499556361288/original/f7567dc5-c773-4e08-a1a6-7783ab172169.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1118179499556361288/original/aad5cc2e-9657-44c8-9bc4-1ab8b291c93c.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1118179499556361288/original/9ebb69c3-9d98-450c-99a5-a289538c8ff1.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1118179499556361288/original/e1fcc5f5-1908-47bf-bc30-1e50b9b4c17b.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1118179499556361288/original/dbfb6d06-c764-4b8c-8ff1-623cc2e3bc15.jpeg?im_w=1440'
    ],
    'Capitol Hill Apartment' => [
      'https://a0.muscache.com/im/pictures/miso/Hosting-1122533168249674335/original/d6a2cecd-03be-4fa6-ae84-29113447b5bd.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-1122533168249674335/original/07a8e6cc-5c6d-4b90-9d18-c43d821c1364.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-1122533168249674335/original/c5ea3a75-9824-424a-b8ef-329cf99bbf31.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-1122533168249674335/original/552d2c03-c141-4439-bd8e-75ceda7992e7.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-1122533168249674335/original/7be60ab7-4ab2-4f70-8a24-9dd0af6a7961.jpeg?im_w=1440'
    ],
    'Riverside Cabin' => ['https://a0.muscache.com/im/pictures/0ff70afc-16db-49ab-8ca8-b3f6f3d5ba62.jpg?im_w=1440',
                          'https://a0.muscache.com/im/pictures/39ab3507-2094-461d-a3ca-bc788b9e0400.jpg?im_w=1440', 'https://a0.muscache.com/im/pictures/7487b208-323e-47d8-91f5-4b6ad7f2b172.jpg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-36976149/original/ffd1efe7-0ee6-4afa-81aa-1ef047076f23.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/a980d3ca-fd74-4f07-abab-ea29f3191fb1.jpg?im_w=1440'],
    'Music Row Loft' => [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1176994270221619055/original/6bbf262a-d6f9-4829-9dab-0438e8f7d2a4.png?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1176994270221619055/original/2587faf7-f121-4a57-a769-b7c6e7b853e3.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1176994270221619055/original/4e497bb4-39a6-4833-ae1f-41a8c7db1893.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1176994270221619055/original/21c86e08-3475-48bb-afca-b7d14950103e.png?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1176994270221619055/original/21059779-3673-4deb-853b-ac4d7d71c4d6.png?im_w=1440'
    ],
    'Wild West Lodge' => ['https://a0.muscache.com/im/pictures/49a238d8-e721-4cd0-b5ee-be9110762eb5.jpg?im_w=1440',
                          'https://a0.muscache.com/im/pictures/04b5e99c-5345-4b18-a01c-0b104791c5e8.jpg?im_w=1200', 'https://a0.muscache.com/im/pictures/13651974-b1a4-4967-8408-e122c5a68043.jpg?im_w=1440', 'https://a0.muscache.com/im/pictures/207c3b4d-38a6-487d-b6cf-1db980b384b1.jpg?im_w=1440', 'https://a0.muscache.com/im/pictures/459379c6-348a-49c5-9db0-ba21be42a9c9.jpg?im_w=1440'],
    'Vermont Farmhouse' => [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1349310231416353227/original/a6d775d3-37ff-4fd9-9d73-0c1140836af9.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1349310231416353227/original/ec1a3a72-6fc2-453b-9a3b-962cbacaa609.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1349310231416353227/original/e4f3616b-f87e-46fd-a7dc-e1c14c363187.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1349310231416353227/original/b88d78df-2f5e-4c39-b000-8412bd531e56.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1349310231416353227/original/39cf84da-912a-455e-8a77-4aa274a83229.jpeg?im_w=1440'
    ],
    'Waikiki Beach Condo' => [
      'https://a0.muscache.com/im/pictures/miso/Hosting-663922203773675977/original/4bb6f914-b39a-491c-a919-e065afbf2d73.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NjYzOTIyMjAzNzczNjc1OTc3/original/754f0107-fe50-43bc-b564-0569e3056334.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NjYzOTIyMjAzNzczNjc1OTc3/original/b3180a9e-0652-4204-86db-411b4f1ad4f9.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-663922203773675977/original/5a6105e7-4793-4222-a8ff-7b7accb7aac7.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-663922203773675977/original/9db14fe5-4302-46a0-8760-227d26f8643b.jpeg?im_w=1440'
    ],
    'Antebellum Mansion' => [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDMyNjMxMDQ%3D/original/3c4c4a8e-024a-46b1-b6b9-a2cf1be372de.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-43263104/original/3d17ff47-5547-488c-9150-4084945d2002.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDMyNjMxMDQ%3D/original/5012cf3d-fda9-4969-96ce-38586d00ed96.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDMyNjMxMDQ%3D/original/d4ebda30-9b6c-4183-9e07-f9b749a877ab.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-43263104/original/6a477325-6ddb-4b96-bb30-574d73175e8a.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDMyNjMxMDQ%3D/original/0aad299d-703e-4952-9417-2f4c5a4a8ba4.jpeg?im_w=1440'
    ],
    'City Park Townhouse' => ['https://a0.muscache.com/im/pictures/602460c7-a0f4-4d9b-9387-058f4f85c732.jpg?im_w=1200',
                              'https://a0.muscache.com/im/pictures/0bf526f2-55b0-4cde-a8dd-ecf7aa926e1f.jpg?im_w=1440', 'https://a0.muscache.com/im/pictures/62df4d30-c0b1-4c91-b0ce-69e9c2e083fa.jpg?im_w=1440', 'https://a0.muscache.com/im/pictures/189d7b70-62da-4629-bfc5-d7cd3a7e7db2.jpg?im_w=1440', 'https://a0.muscache.com/im/pictures/b8f05340-de86-4684-99a2-c4df7bae2183.jpg?im_w=1440'],
    'Seaside Cottage' => [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1359656616716743119/original/4c2db520-a142-4354-be3f-499aef10a51c.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1359656616716743119/original/9a115817-0452-47d0-bd6b-0525adc1c2dd.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1359656616716743119/original/02e42eb2-77b0-4e30-9cb8-c168a4e1ef1e.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1359656616716743119/original/bcbed56d-3e44-453b-a59c-0a0e0f21c142.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1359656616716743119/original/c15db3f4-1e31-4afe-b5bb-88496c30f231.jpeg?im_w=1440'
    ],
    'Desert Villa' => ['https://a0.muscache.com/im/pictures/80c6d691-d795-4ce4-a090-d3c4958e3654.jpg?im_w=1440',
                       'https://a0.muscache.com/im/pictures/24ce1807-2c8b-4968-bed7-3d7466fbf777.jpg?im_w=1440', 'https://a0.muscache.com/im/pictures/e3bb7da4-5389-423c-84cd-5df07baa0b05.jpg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-549932885026636114/original/b1d1220e-0023-48a6-ac18-6d36c0378cb6.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-549932885026636114/original/1286ec09-b2f1-4473-873b-a02572f83f7e.jpeg?im_w=1440'],
    'University District Apartment' => [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTk2NTY4Mw%3D%3D/original/3f2b1104-c0cb-4164-b515-c5f19d164bae.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTk2NTY4Mw%3D%3D/original/4584538f-b704-464d-a897-19730b87dd0a.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-1965683/original/13e95a35-6a03-4acc-a66f-d238c30ab9e3.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTk2NTY4Mw%3D%3D/original/ed663e7c-5c35-4655-8690-fdf3aff97cd6.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-1965683/original/6ae5847b-c78b-4fc7-82b0-e2b728565e96.jpeg?im_w=1440'
    ],
    'Michigan Avenue High-Rise' => [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1557080875210597118/original/2d3c152c-08b9-4854-a422-4c2527e80b52.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1557080875210597118/original/2853d308-dab5-4583-b7cc-60b48b545021.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1557080875210597118/original/b681d105-d6b2-4c53-89f8-d3cdbde46208.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1557080875210597118/original/83acde71-115b-4312-bfdc-315ba03e0164.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1557080875210597118/original/fa72c503-a571-4215-bf2c-6d899fa624cb.jpeg?im_w=1440'
    ],
    'Beverly Hills Estate' => [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMyMDUzMDAyNzMyNzQ3NTc5MQ==/original/df75cc4b-0ef1-4c6b-a3ff-66c5e1be0867.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMyMDUzMDAyNzMyNzQ3NTc5MQ==/original/b8d22c1c-1232-4b77-b0dd-c047b8a4633c.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMyMDUzMDAyNzMyNzQ3NTc5MQ==/original/887c8ab3-39f7-4815-a123-af3c616b9e42.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMyMDUzMDAyNzMyNzQ3NTc5MQ==/original/b8d22c1c-1232-4b77-b0dd-c047b8a4633c.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMyMDUzMDAyNzMyNzQ3NTc5MQ==/original/755795e2-42c7-4cd1-9cc0-2c08d0697467.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMyMDUzMDAyNzMyNzQ3NTc5MQ==/original/80ee585d-e417-4efe-9677-a74d91df4590.jpeg?im_w=1440'
    ],
    'Horse Country Farm' => [
      'https://a0.muscache.com/im/pictures/46277797-5f85-4fd3-9526-6edb1d71f732.jpg',
      'https://a0.muscache.com/im/pictures/67117785/87c4c9e6_original.jpg',
      'https://a0.muscache.com/im/pictures/2472e463-8e7c-45e9-b8c7-8314476e67fc.jpg',
      'https://a0.muscache.com/im/pictures/107807729/7eab4281_original.jpg',
      'https://a0.muscache.com/im/pictures/692368c4-560c-4db4-80e6-33f5a5998c49.jpg'
    ],
    'French Quarter Studio' => [
      'https://a0.muscache.com/im/pictures/b29d650e-29f2-46b4-8eb1-55700567a5b7.jpg'
    ],
    'Volcano Retreat' => [
      'https://a0.muscache.com/im/pictures/80757210/5861dab7_original.jpg',
      'https://a0.muscache.com/im/pictures/4860757/19d54f5e_original.jpg',
      'https://a0.muscache.com/im/pictures/319cbe27-64bd-41ad-8062-cd1d10ca7a03.jpg',
      'https://a0.muscache.com/im/pictures/ecd5fd34-4772-41cc-b787-148081531549.jpg',
      'https://a0.muscache.com/im/pictures/8b4ca8f5-ee5f-40df-9247-fb605c86aa68.jpg'
    ],
    "Artist's Adobe" => [
      'https://a0.muscache.com/im/pictures/266888/7ffca6b2_original.jpg',
      'https://a0.muscache.com/im/pictures/c7dd0938-7616-44b0-8f09-0a309703169a.jpg',
      'https://a0.muscache.com/im/pictures/41922940/51c2b374_original.jpg',
      'https://a0.muscache.com/im/pictures/71538638/05f9a926_original.jpg',
      'https://a0.muscache.com/im/pictures/4902031/4cba1c3e_original.jpg'
    ],
    'Blues District Loft' => [
      'https://a0.muscache.com/im/pictures/16074076/ceb84026_original.jpg',
      'https://a0.muscache.com/im/pictures/a4a0c7bc-776a-4f8c-a0b6-f105ca8ab1bc.jpg',
      'https://a0.muscache.com/im/pictures/7de94caa-5f16-48c8-9394-fbd0cf8dd645.jpg',
      'https://a0.muscache.com/im/pictures/1599d2d2-a1ed-434c-b999-e8add451aa9c.jpg',
      'https://a0.muscache.com/im/pictures/2989800/cbc94843_original.jpg'
    ],
    'Alaska Wilderness Lodge' => [
      'https://a0.muscache.com/im/pictures/82773006/1f8292eb_original.jpg',
      'https://a0.muscache.com/im/pictures/005599b4-1588-4af3-81b0-c464a54c11a1.jpg',
      'https://a0.muscache.com/im/pictures/1fc61fa7-533e-4e22-9139-49d8c78a9655.jpg',
      'https://a0.muscache.com/im/pictures/23b38d79-f9d6-4b3c-85b0-ea7bd4c76dc7.jpg',
      'https://a0.muscache.com/im/pictures/9689147/55546487_original.jpg'
    ],
    'Boardwalk Casino View' => [
      'https://a0.muscache.com/im/pictures/91636173/41dc5bed_original.jpg',
      'https://a0.muscache.com/im/pictures/150a7b51-a9f8-4c1a-bb6e-7e9ed0cd4676.jpg',
      'https://a0.muscache.com/im/pictures/110368302/f59302d9_original.jpg',
      'https://a0.muscache.com/im/pictures/95a6dad4-abef-46e0-8c60-e9d84128747d.jpg',
      'https://a0.muscache.com/im/pictures/d9ea086a-53d0-485c-9d92-12b3881b0b5d.jpg'
    ],
    'Historic Philly Apartment' => [
      'https://a0.muscache.com/im/pictures/d8d498a4-283d-4b3d-bc3b-9cd549ef3b17.jpg',
      'https://a0.muscache.com/im/pictures/df8d8cdd-204f-4f32-b671-08be6ad60f5f.jpg',
      'https://a0.muscache.com/im/pictures/40d82d74-02f2-4f3e-b7a9-7b863dfb6938.jpg',
      'https://a0.muscache.com/im/pictures/fc377fd0-3db5-45a7-b360-b81cd4a4bdc2.jpg',
      'https://a0.muscache.com/im/pictures/30012866/e4189b94_original.jpg'
    ],
    'Desert Vista Home' => [
      'https://a0.muscache.com/im/pictures/miso/Hosting-633401184088209695/original/99d890a4-a240-4bed-81a8-90b1a51dbf14.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-633401184088209695/original/eaab4e24-69b6-485a-8297-c0a3642cad6b.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/miso/Hosting-633401184088209695/original/5435744e-6549-45b8-8bea-77a975b9b486.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-633401184088209695/original/7b7f484f-4054-4f0a-b1d0-9f2302ffabc0.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-633401184088209695/original/7c303e24-4153-4e64-9b9f-327927f230e8.jpeg?im_w=1440'
    ],
    'Historic Prescott House' => [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-44282234/original/4d1f8d30-05ac-461c-a402-cf7924e3f4ea.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-44282234/original/06057d41-08ee-44b4-a1d9-e4c08f84a6df.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-44282234/original/11dcfbb4-f9fd-4f1e-a1ed-5659de49abda.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-44282234/original/ed84d751-e511-4e16-9a62-54c758a42728.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-44282234/original/be0f36bb-79aa-4f2b-bb21-efefd7e4c05b.jpeg?im_w=1440'
    ],
    'Tahoe Ski Chalet' => [
      'https://a0.muscache.com/im/pictures/18204735/4856db73_original.jpg',
      'https://a0.muscache.com/im/pictures/096f1ff3-4a62-4d47-aeae-c97edfc69294.jpg'
    ],
    'Branson Entertainment House' => [
      'https://a0.muscache.com/im/pictures/13889962/62dbeb40_original.jpg',
      'https://a0.muscache.com/im/pictures/97796604/de09fdfe_original.jpg',
      'https://a0.muscache.com/im/pictures/c37b98a0-8e4a-47cb-a6f9-6a1a5cf79f57.jpg',
      'https://a0.muscache.com/im/pictures/8a50066a-2c3b-4005-8935-f4e513983b68.jpg',
      'https://a0.muscache.com/im/pictures/2fbf9e8b-16bb-4bb6-9de9-e826b678ec64.jpg'
    ],
    'Cannery Row Loft' => [
      'https://a0.muscache.com/im/pictures/446621/e5edbb7b_original.jpg',
      'https://a0.muscache.com/im/pictures/e441af17-1a6f-4356-9daa-850b1e1b8769.jpg',
      'https://a0.muscache.com/im/pictures/2143b116-90fc-474b-87fa-d5ba3019a561.jpg',
      'https://a0.muscache.com/im/pictures/8557f20b-7395-4fa8-9ee4-0c5417ed0743.jpg',
      'https://a0.muscache.com/im/pictures/60409145/44806058_original.jpg'
    ],
    'Stockyards Loft' => [
      'https://a0.muscache.com/im/pictures/9689147/55546487_original.jpg',
      'https://a0.muscache.com/im/pictures/42fe612a-d984-47f8-9c74-640d035a0c87.jpg'
    ],
    'Downtown Riverfront Condo' => [
      'https://a0.muscache.com/im/pictures/91636173/41dc5bed_original.jpg',
      'https://a0.muscache.com/im/pictures/22653794/b81b0153_original.jpg',
      'https://a0.muscache.com/im/pictures/45e2a1d2-8130-49c6-adf5-fb0f5c0f0202.jpg',
      'https://a0.muscache.com/im/pictures/dbb3ddb9-922a-420a-9af0-1fde571be8b4.jpg',
      'https://a0.muscache.com/im/pictures/89177752/85546d05_original.jpg'
    ],
    'Midtown Atlanta Apartment' => [
      'https://a0.muscache.com/im/pictures/bd9e03bc-8ed4-47d9-bc22-3a588c64337e.jpg',
      'https://a0.muscache.com/im/pictures/94151105/d486a139_original.jpg',
      'https://a0.muscache.com/im/pictures/cfde7116-514c-417d-8913-375be61d17a2.jpg',
      'https://a0.muscache.com/im/pictures/348a55fe-4b65-452a-b48a-bfecb3b58a66.jpg',
      'https://a0.muscache.com/im/pictures/82509143-4b21-44eb-a556-e3c1e0afac60.jpg'
    ],
    'Beach House Escape' => [
      'https://a0.muscache.com/im/pictures/9689147/55546487_original.jpg',
      'https://a0.muscache.com/im/pictures/42fe612a-d984-47f8-9c74-640d035a0c87.jpg',
      'https://a0.muscache.com/im/pictures/91636173/41dc5bed_original.jpg',
      'https://a0.muscache.com/im/pictures/22653794/b81b0153_original.jpg',
      'https://a0.muscache.com/im/pictures/45e2a1d2-8130-49c6-adf5-fb0f5c0f0202.jpg'
    ],
    'Masters Golf Home' => [
      'https://a0.muscache.com/im/pictures/dbb3ddb9-922a-420a-9af0-1fde571be8b4.jpg',
      'https://a0.muscache.com/im/pictures/89177752/85546d05_original.jpg',
      'https://a0.muscache.com/im/pictures/bd9e03bc-8ed4-47d9-bc22-3a588c64337e.jpg',
      'https://a0.muscache.com/im/pictures/94151105/d486a139_original.jpg',
      'https://a0.muscache.com/im/pictures/cfde7116-514c-417d-8913-375be61d17a2.jpg'
    ],
    'Space City Home' => [
      'https://a0.muscache.com/im/pictures/fbee80ec-8f7c-47e5-b57a-29da2d892bed.jpg',
      'https://a0.muscache.com/im/pictures/67caf206-a728-45e0-bf1e-b45665144309.jpg',
      'https://a0.muscache.com/im/pictures/106782902/11f273e7_original.jpg',
      'https://a0.muscache.com/im/pictures/0d4281fb-5545-41fa-bd18-47ef43918551.jpg',
      'https://a0.muscache.com/im/pictures/9f785682-f24e-4911-8f8f-a5cfc036625f.jpg'
    ],
    'Vegas Strip Penthouse' => [
      'https://a0.muscache.com/im/pictures/9840b084-1dd2-42af-9966-82d7ccb0e39f.jpg',
      'https://a0.muscache.com/im/pictures/a5853c16-2b86-47cc-8735-bd9958808f8d.jpg',
      'https://a0.muscache.com/im/pictures/40e82490-2098-4bbf-a533-5c2d0910c446.jpg',
      'https://a0.muscache.com/im/pictures/d6ba8d7e-7e0b-4041-8e61-6063771278d9.jpg',
      'https://a0.muscache.com/im/pictures/e1adb2b2-3966-4edc-b78d-dd3965e6d0af.jpg'
    ],
    'Rocky Mountain Cabin' => [
      'https://a0.muscache.com/im/pictures/miso/Hosting-633395736724534235/original/209287e0-2b3a-47aa-b600-4b6f166e257f.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/miso/Hosting-633395736724534235/original/419109ee-ec0c-4699-9734-84f63f1b7b68.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-633395736724534235/original/edb471e5-93a3-4325-9836-e2f7fb8a0ed6.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-633395736724534235/original/5422482c-da62-48d2-b63c-d8b7e1051e09.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-633395736724534235/original/bb9790f4-d0be-4e47-bacb-ce8bafa24509.jpeg?im_w=1440'
    ],
    'Jazz District Loft' => [
      'https://a0.muscache.com/im/pictures/bc5e96d1-0f94-4384-a211-f8c11ce8d966.jpg',
      'https://a0.muscache.com/im/pictures/0576c27d-ada2-419b-95c8-cb8214435727.jpg',
      'https://a0.muscache.com/im/pictures/b36887d3-c2a1-44ed-bd44-27ef1152a27b.jpg',
      'https://a0.muscache.com/im/pictures/16571106/48fdae6b_original.jpg',
      'https://a0.muscache.com/im/pictures/66c4d761-9cc1-4fa3-9f21-4859b04fe993.jpg'
    ],
    'Alamo Plaza Condo' => [
      'https://a0.muscache.com/im/pictures/49418240/cd2ffa4b_original.jpg',
      'https://a0.muscache.com/im/pictures/55866464/df1751c2_original.jpg',
      'https://a0.muscache.com/im/pictures/d8c7fb82-96b7-4953-a67e-56bb1b78de7e.jpg',
      'https://a0.muscache.com/im/pictures/bdda8bce-3b1e-460d-9829-e39af808b96a.jpg',
      'https://a0.muscache.com/im/pictures/2503c9be-53cb-4b38-947b-8f993f52d13a.jpg'
    ],
    'Falls View Suite' => [
      'https://a0.muscache.com/im/pictures/f21189ec-1aea-44ac-a71e-9338c6ea363a.jpg',
      'https://a0.muscache.com/im/pictures/d5de72f5-3bca-4d70-a588-bad44af4bf46.jpg',
      'https://a0.muscache.com/im/pictures/0c3306b4-dc0c-46dd-8629-26657ee07142.jpg',
      'https://a0.muscache.com/im/pictures/05729519-205a-4468-9d76-9cd17f047556.jpg',
      'https://a0.muscache.com/im/pictures/f4a7a105-87f9-4416-8b0e-50c781bdb7d4.jpg'
    ],
    'Inner Harbor Condo' => [
      'https://a0.muscache.com/im/pictures/3e8c177c-eb69-4998-909e-fa2979ae91d4.jpg',
      'https://a0.muscache.com/im/pictures/30663656/9a90d0b2_original.jpg',
      'https://a0.muscache.com/im/pictures/b75ae2ec-39ef-40aa-aeb3-a12df0e2c915.jpg',
      'https://a0.muscache.com/im/pictures/4ed030de-4fb9-41c3-869c-3d203bb2f568.jpg',
      'https://a0.muscache.com/im/pictures/042b005b-0245-4fcf-9e69-b7eba6ca6d98.jpg'
    ],
    'Capitol Hill Townhouse' => [
      'https://a0.muscache.com/im/pictures/95e0b719-0c9d-4726-b2ee-31c1cd40ad23.jpg',
      'https://a0.muscache.com/im/pictures/100819206/4636d5d3_original.jpg',
      'https://a0.muscache.com/im/pictures/30cbe75f-0df6-4c33-ba22-1364704b4e42.jpg',
      'https://a0.muscache.com/im/pictures/f990ee73-8492-4ce3-84d8-dd597727caf5.jpg',
      'https://a0.muscache.com/im/pictures/5811e3c1-197d-4432-8282-6a8a0ff3b909.jpg'
    ],
    'Crater Lake Lodge' => [
      'https://a0.muscache.com/im/pictures/22079144/e68e0d20_original.jpg',
      'https://a0.muscache.com/im/pictures/27ab8e87-0bcf-41a1-bfd5-529691e9d4d7.jpg',
      'https://a0.muscache.com/im/pictures/81721420/2776b3af_original.jpg',
      'https://a0.muscache.com/im/pictures/80935036/c9bcf7ad_original.jpg',
      'https://a0.muscache.com/im/pictures/cb916a42-5ce5-4636-8889-ebb6d7b1474b.jpg'
    ],
    'University District Home' => [
      'https://a0.muscache.com/im/pictures/72bc3228-40a9-47c7-b6e1-6f60590734f8.jpg',
      'https://a0.muscache.com/im/pictures/da346e92-2d5b-42a5-a337-6c0910df5bfb.jpg',
      'https://a0.muscache.com/im/pictures/90f9c219-34ec-4034-827b-9b83e894f01b.jpg',
      'https://a0.muscache.com/im/pictures/41819142-74ea-4cc4-9b7f-4476e904056a.jpg',
      'https://a0.muscache.com/im/pictures/c15bfe81-3df9-459e-8820-56482f833e46.jpg'
    ],
    'Sonoma Wine Estate' => [
      'https://a0.muscache.com/im/pictures/35cf3317-4282-4f07-869a-76eb8f89d3df.jpg',
      'https://a0.muscache.com/im/pictures/f45117d8-2682-4af9-8d2d-8c568031c14c.jpg',
      'https://a0.muscache.com/im/pictures/57d0bb4c-7c0d-4126-bf42-03cc42381e07.jpg',
      'https://a0.muscache.com/im/pictures/0e67cd1b-695e-43b7-8c2f-6a7bbb1bb34c.jpg',
      'https://a0.muscache.com/im/pictures/e25ed42d-d430-49c7-9059-bf99e88a9d9b.jpg'
    ],
    'Disney Area Villa' => [
      'https://a0.muscache.com/im/pictures/bdc14579-82a1-4de4-8e11-77730f4458fc.jpg',
      'https://a0.muscache.com/im/pictures/96806300/887d2579_original.jpg',
      'https://a0.muscache.com/im/pictures/2762f4e0-a4c9-4150-8a6d-aa3248abffa0.jpg',
      'https://a0.muscache.com/im/pictures/cfdcfe8a-5f2a-4fb8-97d7-085f8e98c3c1.jpg',
      'https://a0.muscache.com/im/pictures/c742999c-bc6f-47f4-8bfd-eecd7050785e.jpg'
    ],
    'Newport Mansion' => [
      'https://a0.muscache.com/im/pictures/1fd07b68-dec2-4da6-a2d6-b844d142badf.jpg',
      'https://a0.muscache.com/im/pictures/83641365/f95ca5ec_original.jpg',
      'https://a0.muscache.com/im/pictures/21331917/3b24ddc0_original.jpg',
      'https://a0.muscache.com/im/pictures/05c22aae-f444-4a41-8b21-e588c53dc6f6.jpg',
      'https://a0.muscache.com/im/pictures/e8593776-84ef-4aa0-8562-b56579b6e1a5.jpg'
    ],
    'Redwood Forest Cabin' => [
      'https://a0.muscache.com/im/pictures/b5bb473c-b219-4eb7-be48-b8dceb39267c.jpg',
      'https://a0.muscache.com/im/pictures/9c271875-e650-4c29-ae26-f3a9126041e4.jpg',
      'https://a0.muscache.com/im/pictures/100632065/96fc5b4f_original.jpg',
      'https://a0.muscache.com/im/pictures/cbd59a3b-ee9c-4945-9868-989687612a5e.jpg',
      'https://a0.muscache.com/im/pictures/7552d3d3-cb19-448a-a919-1be80be80733.jpg'
    ],
    'Steel City Loft' => [
      'https://a0.muscache.com/im/pictures/c24de2e8-1ae5-4288-b320-298a9cc275a9.jpg',
      'https://a0.muscache.com/im/pictures/5180b4cc-1f0f-4b6f-bfe0-35015ac75592.jpg',
      'https://a0.muscache.com/im/pictures/b9e3851d-2866-48a9-ad62-8ce568bfd2a5.jpg',
      'https://a0.muscache.com/im/pictures/e605e80f-5947-4d01-8d34-f63143714781.jpg',
      'https://a0.muscache.com/im/pictures/11883705/242a2a5c_original.jpg'
    ],
    'Indy 500 Home' => [
      'https://a0.muscache.com/im/pictures/897e819b-4ca5-4045-ac4c-d7c7c0fb8043.jpg',
      'https://a0.muscache.com/im/pictures/f1cf0332-43ec-444c-a2d3-cb0b514df4ad.jpg',
      'https://a0.muscache.com/im/pictures/f76153d5-c4d1-4662-987d-9931a6b62220.jpg',
      'https://a0.muscache.com/im/pictures/58555812/11b0afd1_original.jpg',
      'https://a0.muscache.com/im/pictures/100622557/d916df7b_original.jpg'
    ],
    'Vermont Mountain Lodge' => [
      'https://a0.muscache.com/im/pictures/732c0ad4-6f59-4cf8-a221-f41de253caf3.jpg',
      'https://a0.muscache.com/im/pictures/26472cad-7074-4f09-ad41-c6a0ef0a60a5.jpg',
      'https://a0.muscache.com/im/pictures/7dc04ae1-0111-4d7a-a3f7-8b509df75180.jpg',
      'https://a0.muscache.com/im/pictures/9068074/b8d00a72_original.jpg',
      'https://a0.muscache.com/im/pictures/ca62e3a8-40b2-4371-a630-886fb6a083ba.jpg'
    ],
    'Mission Bay Beach House' => [
      'https://a0.muscache.com/im/pictures/8b1a6c2f-3135-4948-b1dd-4814c330ce68.jpg',
      'https://a0.muscache.com/im/pictures/1e0f60fb-329a-48d1-91dd-bb4befb25eea.jpg',
      'https://a0.muscache.com/im/pictures/7e3332c9-0f57-42cc-aba2-15bf3be42510.jpg',
      'https://a0.muscache.com/im/pictures/8974294/4349c8a4_original.jpg',
      'https://a0.muscache.com/im/pictures/0cad8b5d-b15c-47ea-938e-61dc3ebb498c.jpg'
    ],
    'Colonial Williamsburg Home' => [
      'https://a0.muscache.com/im/pictures/28750ac4-5c8d-4f1c-a9ac-74b7319618a2.jpg',
      'https://a0.muscache.com/im/pictures/3ed9f5a4-fd6d-442b-aa8e-66156c49261d.jpg',
      'https://a0.muscache.com/im/pictures/36284523/23ef3a1e_original.jpg',
      'https://a0.muscache.com/im/pictures/38172341/7e4ae7f3_original.jpg',
      'https://a0.muscache.com/im/pictures/63909197/1ba48a2f_original.jpg'
    ],
    'Flagstaff Pine Cabin' => [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-835696874356448964/original/c008b2ef-3fe0-4a66-9df3-59185e343580.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-835696874356448964/original/a19abcae-bc36-4678-9a68-87ee448de0eb.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-835696874356448964/original/a6b5aea8-af73-400d-8aff-ddce8dc0814e.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-835696874356448964/original/da2c6707-61fe-48ec-b74a-c9c9b2cf0694.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-835696874356448964/original/b9dc48d2-adff-4a6e-81f6-94d40b4b73a3.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-835696874356448964/original/d45a828e-f397-4f87-b0d8-7ac647137527.jpeg?im_w=1440'
    ],
    'Russian Hill Apartment' => [
      'https://a0.muscache.com/im/pictures/23376700/00a1353b_original.jpg',
      'https://a0.muscache.com/im/pictures/9202f6d5-e103-4cb2-b9cc-1b932bd7b564.jpg',
      'https://a0.muscache.com/im/pictures/96959281/b07961ae_original.jpg',
      'https://a0.muscache.com/im/pictures/91844988-be0d-4ad9-b57d-59e41389ca78.jpg',
      'https://a0.muscache.com/im/pictures/9a221c83-a7ea-4f60-848c-c5e5daf731db.jpg'
    ],
    'Gateway Arch Loft' => [
      'https://a0.muscache.com/im/pictures/101346042/91163461_original.jpg',
      'https://a0.muscache.com/im/pictures/60113400/e251cfe1_original.jpg',
      'https://a0.muscache.com/im/pictures/4019865/ebfd78ec_original.jpg',
      'https://a0.muscache.com/im/pictures/6b3243d0-ce9a-42ba-89ec-70fadd80c147.jpg',
      'https://a0.muscache.com/im/pictures/3e8c177c-eb69-4998-909e-fa2979ae91d4.jpg'
    ],
    'Gulf Coast Condo' => [
      'https://a0.muscache.com/im/pictures/7a1afc2d-4c55-4ca9-b0a6-72e21a217048.jpg',
      'https://a0.muscache.com/im/pictures/59124289/82d7a8ac_original.jpg',
      'https://a0.muscache.com/im/pictures/0575ef5c-175e-461c-9eff-881e036864ea.jpg',
      'https://a0.muscache.com/im/pictures/c4336a12-1a31-498a-a7f5-f9ce33e328e8.jpg',
      'https://a0.muscache.com/im/pictures/50683123/296d2a07_original.jpg'
    ],
    'Downtown Reno Apartment' => [
      'https://a0.muscache.com/im/pictures/619f4cdc-d6e7-40b1-8dec-d2c50c5370cb.jpg',
      'https://a0.muscache.com/im/pictures/af81e25f-6517-4b28-96ac-5acb8acfb4c1.jpg',
      'https://a0.muscache.com/im/pictures/111541710/09f1500d_original.jpg',
      'https://a0.muscache.com/im/pictures/71875829/7d488759_original.jpg',
      'https://a0.muscache.com/im/pictures/94980fc9-53fb-409f-bc7f-68d591b046d8.jpg'
    ],
    'West Hollywood Penthouse' => [
      'https://a0.muscache.com/im/pictures/1557b79f-cc9f-4c19-bcd0-9ad414aeb9b7.jpg',
      'https://a0.muscache.com/im/pictures/45681948/5f161d97_original.jpg',
      'https://a0.muscache.com/im/pictures/1a7a5c7d-549e-40ac-8b94-1934ff98489d.jpg',
      'https://a0.muscache.com/im/pictures/a47df854-5a68-40ce-a945-0783074ddbfb.jpg',
      'https://a0.muscache.com/im/pictures/b9196d59-821b-47a0-9313-c0aed240062d.jpg'
    ],
    'North End Brownstone' => [
      'https://a0.muscache.com/im/pictures/456d0712-d58b-4183-909b-d299e21e2ca3.jpg',
      'https://a0.muscache.com/im/pictures/a7119131-45ae-4f88-99b9-9b05615f8759.jpg',
      'https://a0.muscache.com/im/pictures/ae8da3d8-bbd8-4d81-a9f5-f74f44381961.jpg',
      'https://a0.muscache.com/im/pictures/f4c0a6be-bbf8-4978-b061-ef74972ab8d2.jpg',
      'https://a0.muscache.com/im/pictures/19537129-2842-4b93-aa40-10191d4ca86b.jpg'
    ],
    'Derby City Loft' => [
      'https://a0.muscache.com/im/pictures/5f51dbfd-e1c5-4365-a5fc-7a063fceecb2.jpg',
      'https://a0.muscache.com/im/pictures/32260527/cfe359c8_original.jpg',
      'https://a0.muscache.com/im/pictures/2f769063-e111-4450-ad64-b97e587a7064.jpg',
      'https://a0.muscache.com/im/pictures/41d4c153-90bb-418e-a303-84ebde6f4d45.jpg',
      'https://a0.muscache.com/im/pictures/4c54d37f-398b-4b1d-80d7-fee5df093535.jpg'
    ],
    'Capitol City House' => [
      'https://a0.muscache.com/im/pictures/83129904/ae821ad4_original.jpg',
      'https://a0.muscache.com/im/pictures/180e8e18-b86a-42ea-9357-08892d86444d.jpg',
      'https://a0.muscache.com/im/pictures/4627bee5-c75a-4ab3-a028-e464d9b03741.jpg',
      'https://a0.muscache.com/im/pictures/8a3371e5-5111-4954-9149-48be9f946d02.jpg',
      'https://a0.muscache.com/im/pictures/32897a0d-fcb3-42dc-8b55-6315d7db7a74.jpg'
    ],
    'Emerald Coast Villa' => [
      'https://a0.muscache.com/im/pictures/prohost-api/Hosting-24455069/original/2b5e8340-bad5-4609-8533-82cad232b9a1.jpeg?im_w=1200', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-24455069/original/2df27967-445d-4944-acff-b15a9397064e.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-24455069/original/6cd1729f-ee2d-4550-86e0-f92d15286bfd.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-24455069/original/ca9a130b-02ca-4dcf-a9d3-b8e7d84c41c7.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-24455069/original/415f03d7-a15d-4516-91dc-e8c571ff8215.jpeg?im_w=1440'
    ],
    'Park City Ski House' => [
      'https://a0.muscache.com/im/pictures/miso/Hosting-950072255965422544/original/435bad28-aac9-41f1-9a36-8ceefb27c851.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-950072255965422544/original/35e7aa64-571b-407d-bbec-2c001cb8859a.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-950072255965422544/original/8d55fb0b-3741-499d-b9d2-df957c81cdfb.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-950072255965422544/original/5a7a8872-0fc0-4c16-9812-c4b834edf799.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/miso/Hosting-950072255965422544/original/55f3f617-ce59-4724-90cb-83f2cfc084f6.jpeg?im_w=1440'
    ],
    'Elvis District House' => [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM3NTMxOTMwMTU1MzY0MDAxOA==/original/a49855bd-7200-40d8-b538-74041ead9a92.png?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1375319301553640018/original/a69c5603-973b-487d-a291-b2424943fb1f.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1375319301553640018/original/d8fa9a59-d12a-44f8-93b4-486b943be390.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1375319301553640018/original/b2bf83e3-c13d-4d7f-b94a-9848100c7bfb.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1375319301553640018/original/36d89425-af11-4cef-ac6b-bf931ea3e4b7.jpeg?im_w=1440'
    ],
    'Canyon Rim Lodge' => [
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1265360645847294508/original/d6255719-ce16-4392-9891-49186e1f97db.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1265360645847294508/original/2369ab6f-7d53-4755-88e0-d067843a3458.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1265360645847294508/original/559d0442-3b95-47d4-9931-1ddea355cdb2.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1265360645847294508/original/29dbce60-9c37-4cc5-b120-94caaef0b909.jpeg?im_w=1440', 'https://a0.muscache.com/im/pictures/hosting/Hosting-1265360645847294508/original/4d85043b-90e4-48b1-9e7d-e244f9fa4df5.jpeg?im_w=1440'
    ]
  }

  property_image_data.each do |property_name, urls|
    property = Property.find_by(name: property_name)

    if property
      urls.each do |url|
        PropertyImage.create!(
          property_id: property.id,
          url: url,
          created_at: Time.current,
          updated_at: Time.current
        )
      end
      puts "Seeded Image for #{property_name}"
    else
      puts "Property not found: #{property_name}"
    end
  end
end
